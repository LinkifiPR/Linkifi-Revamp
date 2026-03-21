type ContactEmailConfig = {
  resendApiKey?: string;
  toEmail?: string;
  fromEmail?: string;
};

export function getContactEmailConfig(): ContactEmailConfig {
  return {
    resendApiKey: process.env.RESEND_API_KEY?.trim(),
    toEmail: process.env.CONTACT_FORM_TO_EMAIL?.trim(),
    fromEmail: process.env.CONTACT_FORM_FROM_EMAIL?.trim(),
  };
}

export function hasContactEmailConfig(): boolean {
  const config = getContactEmailConfig();

  return Boolean(config.resendApiKey && config.toEmail && config.fromEmail);
}
