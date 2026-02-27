export const CMS_SESSION_COOKIE = "linkifi_admin_session";
export const CMS_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

type AdminSessionPayload = {
  v: 1;
  sub: string;
  role: "admin";
  iat: number;
  exp: number;
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value + "=".repeat((4 - (value.length % 4)) % 4);
  const normalized = padded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function getSessionSecret(): string {
  return process.env.CMS_SESSION_SECRET ?? "";
}

function getAdminCredentials() {
  return {
    username: process.env.CMS_ADMIN_USERNAME ?? "",
    password: process.env.CMS_ADMIN_PASSWORD ?? "",
  };
}

export function hasCmsAuthConfig(): boolean {
  const { username, password } = getAdminCredentials();
  return Boolean(username && password && getSessionSecret());
}

export function safeCompare(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length);
  let mismatch = a.length ^ b.length;

  for (let i = 0; i < maxLen; i += 1) {
    const aCode = a.charCodeAt(i) || 0;
    const bCode = b.charCodeAt(i) || 0;
    mismatch |= aCode ^ bCode;
  }

  return mismatch === 0;
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const configured = getAdminCredentials();
  return safeCompare(username, configured.username) && safeCompare(password, configured.password);
}

export async function createAdminSession(username: string): Promise<string> {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("CMS session secret is not configured.");
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    v: 1,
    sub: username,
    role: "admin",
    iat: nowSeconds,
    exp: nowSeconds + CMS_SESSION_MAX_AGE_SECONDS,
  };

  const payloadBytes = textEncoder.encode(JSON.stringify(payload));
  const payloadPart = toBase64Url(payloadBytes);
  const signingInput = `v1.${payloadPart}`;

  const key = await getHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(signingInput));
  const signaturePart = toBase64Url(new Uint8Array(signature));

  return `${signingInput}.${signaturePart}`;
}

export async function verifyAdminSession(token?: string | null): Promise<{
  valid: boolean;
  username?: string;
}> {
  if (!token) {
    return { valid: false };
  }

  const secret = getSessionSecret();
  if (!secret) {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false };
  }

  const [version, payloadPart, signaturePart] = parts;
  if (version !== "v1") {
    return { valid: false };
  }

  try {
    const key = await getHmacKey(secret);
    const verified = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signaturePart),
      textEncoder.encode(`${version}.${payloadPart}`),
    );

    if (!verified) {
      return { valid: false };
    }

    const payloadJson = textDecoder.decode(fromBase64Url(payloadPart));
    const payload = JSON.parse(payloadJson) as Partial<AdminSessionPayload>;

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (
      payload.v !== 1 ||
      payload.role !== "admin" ||
      typeof payload.sub !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp <= nowSeconds
    ) {
      return { valid: false };
    }

    return { valid: true, username: payload.sub };
  } catch {
    return { valid: false };
  }
}

export function getSessionCookieConfig() {
  return {
    name: CMS_SESSION_COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CMS_SESSION_MAX_AGE_SECONDS,
  };
}
