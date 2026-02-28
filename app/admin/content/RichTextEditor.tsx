"use client";

import type { ClipboardEvent, MouseEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type StructuredInsertType = "image" | "faq" | "table" | "stats";

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
  onInsertStructuredBlock?: (type: StructuredInsertType) => {
    id: string;
    type: StructuredInsertType;
    label: string;
  } | null;
  onSelectStructuredBlock?: (blockId: string | null) => void;
  selectedStructuredBlockId?: string | null;
  contextPanel?: ReactNode;
  footerPanel?: ReactNode;
  availableInsertTypes?: StructuredInsertType[];
};

function escapeForPreview(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "blockquote",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "a",
]);

const BLOCK_CONTAINER_TAGS = new Set(["p", "h2", "h3", "h4", "blockquote", "ul", "ol", "li"]);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeHref(rawHref: string): string {
  const href = rawHref.trim();
  if (!href) {
    return "";
  }

  const allowedPrefixes = ["http://", "https://", "mailto:", "tel:", "/", "#"];
  const matchesAllowedPrefix = allowedPrefixes.some((prefix) => href.startsWith(prefix));
  return matchesAllowedPrefix ? href : "";
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildStructuredTokenHtml(token: { id: string; type: StructuredInsertType; label: string }): string {
  const safeId = escapeAttribute(token.id);
  const safeType = escapeAttribute(token.type);
  const safeLabel = escapeHtml(token.label);

  return [
    `<p><span data-cms-block-id="${safeId}" data-cms-block-type="${safeType}" contenteditable="false" class="cms-inline-block-token">${safeLabel}</span></p>`,
    "<p><br></p>",
  ].join("");
}

function plainTextToHtml(value: string): string {
  const normalized = value.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return "<p><br></p>";
  }

  return normalized
    .split(/\n{2,}/)
    .map((paragraph) => {
      const withLineBreaks = paragraph
        .split("\n")
        .map((line) => escapeHtml(line))
        .join("<br>");
      return `<p>${withLineBreaks || "<br>"}</p>`;
    })
    .join("");
}

function sanitizeElementNode(node: Node, outputDocument: Document): Node[] {
  if (node.nodeType === Node.TEXT_NODE) {
    const value = node.textContent ?? "";
    return value ? [outputDocument.createTextNode(value)] : [];
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return [];
  }

  const sourceElement = node as HTMLElement;
  const tagName = sourceElement.tagName.toLowerCase();

  const childNodes = Array.from(sourceElement.childNodes).flatMap((child) =>
    sanitizeElementNode(child, outputDocument),
  );

  if (!ALLOWED_TAGS.has(tagName)) {
    return childNodes;
  }

  const safeElement = outputDocument.createElement(tagName);

  if (tagName === "a") {
    const href = normalizeHref(sourceElement.getAttribute("href") || "");
    if (!href) {
      return childNodes;
    }

    safeElement.setAttribute("href", href);

    const target = sourceElement.getAttribute("target");
    if (target === "_blank") {
      safeElement.setAttribute("target", "_blank");
    }

    const relSet = new Set<string>();
    const sourceRel = (sourceElement.getAttribute("rel") || "")
      .split(/\s+/)
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    for (const token of sourceRel) {
      if (token === "nofollow" || token === "sponsored" || token === "ugc") {
        relSet.add(token);
      }
    }

    if (target === "_blank") {
      relSet.add("noopener");
      relSet.add("noreferrer");
    }

    if (relSet.size > 0) {
      safeElement.setAttribute("rel", Array.from(relSet).join(" "));
    }
  }

  for (const child of childNodes) {
    safeElement.appendChild(child);
  }

  if (BLOCK_CONTAINER_TAGS.has(tagName) && safeElement.childNodes.length === 0) {
    safeElement.appendChild(outputDocument.createElement("br"));
  }

  return [safeElement];
}

function sanitizeClipboardHtml(value: string): string {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(value, "text/html");
  const outputDocument = document.implementation.createHTMLDocument("sanitized");
  const container = outputDocument.createElement("div");

  for (const node of Array.from(parsed.body.childNodes)) {
    const safeNodes = sanitizeElementNode(node, outputDocument);
    for (const safeNode of safeNodes) {
      container.appendChild(safeNode);
    }
  }

  const html = container.innerHTML.trim();
  return html || "<p><br></p>";
}

export default function RichTextEditor({
  value,
  onChange,
  onInsertStructuredBlock,
  onSelectStructuredBlock,
  selectedStructuredBlockId,
  contextPanel,
  footerPanel,
  availableInsertTypes = ["image", "faq", "table"],
}: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef<Range | null>(null);

  const [showLinkControls, setShowLinkControls] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkNoFollow, setLinkNoFollow] = useState(false);
  const [linkSponsored, setLinkSponsored] = useState(false);
  const [linkNewTab, setLinkNewTab] = useState(true);
  const [textColor, setTextColor] = useState("#f2f4ff");
  const [highlightColor, setHighlightColor] = useState("#6b57e6");

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "<p><br></p>";
    }
  }, [value]);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const tokenElements = Array.from(
      editorRef.current.querySelectorAll<HTMLElement>("[data-cms-block-id]"),
    );

    for (const tokenElement of tokenElements) {
      const tokenId = tokenElement.getAttribute("data-cms-block-id");
      if (selectedStructuredBlockId && tokenId === selectedStructuredBlockId) {
        tokenElement.setAttribute("data-selected", "true");
      } else {
        tokenElement.removeAttribute("data-selected");
      }
    }
  }, [selectedStructuredBlockId, value]);

  const plainPreview = useMemo(() => {
    if (!value) {
      return "Start writing your article body here...";
    }

    const text = value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text.slice(0, 140) || "Start writing your article body here...";
  }, [value]);

  function syncContent() {
    onChange(editorRef.current?.innerHTML || "");
  }

  function handleToolbarMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLButtonElement) {
      event.preventDefault();
    }
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function executeCommand(command: string, commandValue?: string) {
    focusEditor();
    restoreSelection();
    document.execCommand(command, false, commandValue);
    syncContent();
  }

  function formatBlock(tag: "P" | "H2" | "H3" | "H4" | "BLOCKQUOTE") {
    focusEditor();
    restoreSelection();
    document.execCommand("formatBlock", false, `<${tag}>`);
    syncContent();
  }

  function applyTextColor(nextColor: string) {
    setTextColor(nextColor);
    focusEditor();
    restoreSelection();
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("foreColor", false, nextColor);
    syncContent();
  }

  function applyHighlightColor(nextColor: string) {
    setHighlightColor(nextColor);
    focusEditor();
    restoreSelection();
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("hiliteColor", false, nextColor);
    syncContent();
  }

  function captureSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0);
    }
  }

  function restoreSelection() {
    const selection = window.getSelection();
    if (!selection || !selectionRef.current) {
      return;
    }

    selection.removeAllRanges();
    selection.addRange(selectionRef.current);
  }

  function openLinkControls() {
    captureSelection();
    setShowLinkControls(true);
  }

  function closeLinkControls() {
    setShowLinkControls(false);
    setLinkUrl("");
    setLinkNoFollow(false);
    setLinkSponsored(false);
    setLinkNewTab(true);
  }

  function applyLink() {
    const url = linkUrl.trim();
    if (!url) {
      return;
    }

    focusEditor();
    restoreSelection();
    document.execCommand("createLink", false, url);

    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    const anchorElement = anchorNode
      ? (anchorNode.nodeType === Node.ELEMENT_NODE
          ? (anchorNode as Element)
          : anchorNode.parentElement
        )?.closest("a")
      : null;

    if (anchorElement instanceof HTMLAnchorElement) {
      const relValues = [
        linkNoFollow ? "nofollow" : "",
        linkSponsored ? "sponsored" : "",
      ].filter(Boolean);

      anchorElement.setAttribute("href", url);
      if (linkNewTab) {
        anchorElement.setAttribute("target", "_blank");
        relValues.push("noopener", "noreferrer");
      } else {
        anchorElement.removeAttribute("target");
      }

      if (relValues.length > 0) {
        anchorElement.setAttribute("rel", Array.from(new Set(relValues)).join(" "));
      } else {
        anchorElement.removeAttribute("rel");
      }
    }

    syncContent();
    closeLinkControls();
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();

    const clipboardHtml = event.clipboardData.getData("text/html");
    const clipboardText = event.clipboardData.getData("text/plain");
    const sanitizedHtml = clipboardHtml
      ? sanitizeClipboardHtml(clipboardHtml)
      : plainTextToHtml(clipboardText);

    focusEditor();
    document.execCommand("insertHTML", false, sanitizedHtml);
    syncContent();
  }

  function insertStructuredBlock(type: StructuredInsertType) {
    if (!onInsertStructuredBlock) {
      return;
    }

    const token = onInsertStructuredBlock(type);
    if (!token) {
      return;
    }

    focusEditor();
    restoreSelection();
    const tokenHtml = buildStructuredTokenHtml(token);
    document.execCommand("insertHTML", false, tokenHtml);
    syncContent();
    onSelectStructuredBlock?.(token.id);
  }

  function handleEditorClick(event: MouseEvent<HTMLDivElement>) {
    const clickTarget =
      event.target instanceof Element
        ? event.target
        : event.target instanceof Node
          ? event.target.parentElement
          : null;
    const tokenElement = clickTarget?.closest("[data-cms-block-id]");

    if (tokenElement instanceof HTMLElement) {
      onSelectStructuredBlock?.(tokenElement.getAttribute("data-cms-block-id"));
      return;
    }

    onSelectStructuredBlock?.(null);
  }

  const insertButtonLabels: Record<StructuredInsertType, string> = {
    image: "+ Image",
    faq: "+ FAQ",
    table: "+ Table",
    stats: "+ Figures",
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-[#0f1328] p-4">
      <div
        className="flex flex-wrap gap-2 border-b border-white/10 pb-3"
        onMouseDown={handleToolbarMouseDown}
      >
        <button
          type="button"
          onClick={() => formatBlock("P")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Paragraph
        </button>
        <button
          type="button"
          onClick={() => formatBlock("H2")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => formatBlock("H3")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => formatBlock("H4")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          H4
        </button>
        <button
          type="button"
          onClick={() => executeCommand("bold")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => executeCommand("italic")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => executeCommand("underline")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Underline
        </button>
        <button
          type="button"
          onClick={() => executeCommand("strikeThrough")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Bullets
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Numbers
        </button>
        <button
          type="button"
          onClick={() => formatBlock("BLOCKQUOTE")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Quote
        </button>
        <button
          type="button"
          onClick={openLinkControls}
          className="rounded-full border border-[#8f7bff]/45 bg-[#8f7bff]/15 px-3 py-1 text-xs font-semibold text-white hover:bg-[#8f7bff]/25"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => executeCommand("unlink")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Unlink
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyLeft")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyCenter")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Center
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyRight")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Right
        </button>
        <button
          type="button"
          onClick={() => executeCommand("removeFormat")}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
        >
          Clear
        </button>
        <label className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white">
          Text
          <input
            type="color"
            value={textColor}
            onChange={(event) => applyTextColor(event.target.value)}
            className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
          />
        </label>
        <label className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white">
          Highlight
          <input
            type="color"
            value={highlightColor}
            onChange={(event) => applyHighlightColor(event.target.value)}
            className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
          />
        </label>
        {availableInsertTypes.map((insertType) => (
          <button
            key={insertType}
            type="button"
            onClick={() => insertStructuredBlock(insertType)}
            className="rounded-full border border-[#8f7bff]/45 bg-[#8f7bff]/15 px-3 py-1 text-xs font-semibold text-white hover:bg-[#8f7bff]/25"
          >
            {insertButtonLabels[insertType]}
          </button>
        ))}
      </div>

      {showLinkControls ? (
        <div className="mt-3 rounded-xl border border-white/15 bg-[#151a35] p-3">
          <p className="text-xs uppercase tracking-[0.12em] text-[#aeb5e5]">Insert Link</p>
          <label className="mt-2 block text-xs text-[#d0d4f2]">
            URL
            <input
              type="text"
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              placeholder="https://example.com"
              className="mt-1 w-full rounded-lg border border-white/20 bg-[#0f1328] px-2.5 py-2 text-sm text-white"
            />
          </label>
          <div className="mt-2 grid gap-2 text-xs text-[#d0d4f2] sm:grid-cols-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={linkNoFollow}
                onChange={(event) => setLinkNoFollow(event.target.checked)}
              />
              Nofollow
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={linkSponsored}
                onChange={(event) => setLinkSponsored(event.target.checked)}
              />
              Sponsored
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={linkNewTab}
                onChange={(event) => setLinkNewTab(event.target.checked)}
              />
              Open new tab
            </label>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={applyLink}
              className="rounded-full bg-[#6b57e6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5a47ce]"
            >
              Apply Link
            </button>
            <button
              type="button"
              onClick={closeLinkControls}
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className={contextPanel ? "mt-3 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]" : "mt-3"}>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={syncContent}
          onKeyUp={captureSelection}
          onMouseUp={captureSelection}
          onBlur={captureSelection}
          onPaste={handlePaste}
          onClick={handleEditorClick}
          className="cms-richtext cms-richtext-editor min-h-[320px] rounded-xl border border-white/20 bg-[#0e1431] px-5 py-4 text-[#f2f4ff] outline-none focus:border-[#8f7bff]/70 focus:ring-2 focus:ring-[#8f7bff]/20"
        />

        {contextPanel ? (
          <aside className="rounded-xl border border-white/15 bg-[#151a35] p-4 xl:sticky xl:top-4 self-start">
            {contextPanel}
          </aside>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-[#8f95be]">
        Preview text: <span className="text-[#c8cdf0]">{escapeForPreview(plainPreview)}</span>
      </p>
      {footerPanel ? <div className="mt-4 border-t border-white/10 pt-4">{footerPanel}</div> : null}
    </div>
  );
}
