"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
};

function escapeForPreview(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef<Range | null>(null);

  const [showLinkControls, setShowLinkControls] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkNoFollow, setLinkNoFollow] = useState(false);
  const [linkSponsored, setLinkSponsored] = useState(false);
  const [linkNewTab, setLinkNewTab] = useState(true);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "<p><br></p>";
    }
  }, [value]);

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

  function focusEditor() {
    editorRef.current?.focus();
  }

  function executeCommand(command: string, commandValue?: string) {
    focusEditor();
    document.execCommand(command, false, commandValue);
    syncContent();
  }

  function formatBlock(tag: "P" | "H2" | "H3") {
    focusEditor();
    document.execCommand("formatBlock", false, `<${tag}>`);
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

  return (
    <div className="rounded-2xl border border-white/15 bg-[#0f1328] p-4">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
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

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        onBlur={captureSelection}
        className="cms-richtext mt-3 min-h-[280px] rounded-xl border border-white/15 bg-[#10152e] px-4 py-3 text-white outline-none focus:border-[#8f7bff]/70"
      />

      <p className="mt-3 text-xs text-[#8f95be]">
        Preview text: <span className="text-[#c8cdf0]">{escapeForPreview(plainPreview)}</span>
      </p>
    </div>
  );
}
