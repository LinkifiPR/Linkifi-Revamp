"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/cms-render";

type Props = {
  items: TocItem[];
};

const ACTIVE_HEADING_OFFSET_PX = 160;

function sortItemsByDocumentOrder(items: TocItem[]): TocItem[] {
  const withElements = items
    .map((item) => ({
      item,
      element: document.getElementById(item.id),
    }))
    .filter((entry): entry is { item: TocItem; element: HTMLElement } => Boolean(entry.element));

  if (withElements.length === 0) {
    return items;
  }

  const position = new Map<string, number>();
  withElements
    .sort((a, b) => {
      if (a.element === b.element) {
        return 0;
      }
      const relation = a.element.compareDocumentPosition(b.element);
      return relation & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    })
    .forEach((entry, index) => {
      position.set(entry.item.id, index);
    });

  return [...items].sort(
    (a, b) => (position.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (position.get(b.id) ?? Number.MAX_SAFE_INTEGER),
  );
}

export function CmsTableOfContents({ items }: Props) {
  const [orderedItems, setOrderedItems] = useState(items);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    setOrderedItems(items);
    setActiveId(items[0]?.id ?? "");
  }, [items]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const syncOrder = () => {
      const nextOrder = sortItemsByDocumentOrder(items);
      const signature = nextOrder.map((item) => item.id).join("|");
      setOrderedItems((currentOrder) => {
        const currentSignature = currentOrder.map((item) => item.id).join("|");
        return currentSignature === signature ? currentOrder : nextOrder;
      });
    };

    syncOrder();
    const frameId = window.requestAnimationFrame(syncOrder);
    return () => window.cancelAnimationFrame(frameId);
  }, [items]);

  useEffect(() => {
    if (orderedItems.length === 0) {
      return;
    }

    const headings = orderedItems
      .map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }))
      .filter((entry): entry is { id: string; element: HTMLElement } => Boolean(entry.element));

    if (headings.length === 0) {
      return;
    }

    let frameId = 0;

    const updateActiveHeading = () => {
      const pageBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const atBottom = documentHeight - pageBottom < 8;

      let nextActiveId = headings[0].id;

      if (atBottom) {
        nextActiveId = headings[headings.length - 1].id;
      } else {
        for (const heading of headings) {
          if (heading.element.getBoundingClientRect().top <= ACTIVE_HEADING_OFFSET_PX) {
            nextActiveId = heading.id;
            continue;
          }
          break;
        }
      }

      setActiveId((previous) => (previous === nextActiveId ? previous : nextActiveId));
    };

    const scheduleActiveUpdate = () => {
      if (frameId) {
        return;
      }
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateActiveHeading();
      });
    };

    updateActiveHeading();
    window.addEventListener("scroll", scheduleActiveUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveUpdate);
    window.addEventListener("hashchange", scheduleActiveUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleActiveUpdate);
      window.removeEventListener("resize", scheduleActiveUpdate);
      window.removeEventListener("hashchange", scheduleActiveUpdate);
    };
  }, [orderedItems]);

  useEffect(() => {
    if (!activeId) {
      return;
    }

    const activeItem = linkRefs.current[activeId];
    if (!activeItem) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activeItem.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeId]);

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="overflow-hidden rounded-[1.65rem] border border-[#e8e4ff] bg-[linear-gradient(180deg,#ffffff,#fbfaff)] shadow-[0_16px_38px_rgba(35,29,91,0.06)] xl:flex xl:max-h-[calc(100vh-6.5rem)] xl:flex-col">
      <div className="h-1 w-full bg-[linear-gradient(90deg,#6d5dff,#48b5ff,#6d5dff)] opacity-70" />
      <div className="border-b border-[#ece8ff] bg-[linear-gradient(135deg,#f8f5ff,#ffffff)] px-4 py-3">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e69a6]">
          <span className="h-2 w-2 rounded-full bg-[#6d5dff]" />
          On This Page
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-3 text-[12px] leading-[1.28] xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
        {orderedItems.map((item) => (
          <li key={item.id} className={item.level === 2 ? "" : item.level === 3 ? "pl-3" : "pl-5"}>
            <a
              href={`#${item.id}`}
              ref={(node) => {
                if (node) {
                  linkRefs.current[item.id] = node;
                  return;
                }
                delete linkRefs.current[item.id];
              }}
              aria-current={item.id === activeId ? "location" : undefined}
              onClick={() => setActiveId(item.id)}
              className={`block rounded-xl px-2.5 py-1.5 font-medium transition-all duration-200 ${
                item.id === activeId
                  ? "bg-[#f1edff] text-[#4d40da] shadow-[inset_0_0_0_1px_rgba(116,94,255,0.2)]"
                  : "text-[#444774] hover:bg-[#f5f2ff] hover:text-[#4d40da] hover:translate-x-0.5"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
