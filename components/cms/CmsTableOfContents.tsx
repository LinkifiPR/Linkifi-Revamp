import type { TocItem } from "@/lib/cms-render";

type Props = {
  items: TocItem[];
};

export function CmsTableOfContents({ items }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="overflow-hidden rounded-[2rem] border border-white/85 bg-[linear-gradient(180deg,#ffffff,#f7f5ff)] shadow-[0_22px_56px_rgba(35,29,91,0.08)]">
      <div className="h-1 w-full bg-[linear-gradient(90deg,#6d5dff,#48b5ff,#6d5dff)] opacity-75" />
      <div className="border-b border-[#ece8ff] bg-[linear-gradient(135deg,#f8f5ff,#ffffff)] px-5 py-4">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e69a6]">
          <span className="h-2 w-2 rounded-full bg-[#6d5dff]" />
          On This Page
        </p>
      </div>
      <ul className="space-y-2 px-4 py-4 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 2 ? "" : item.level === 3 ? "pl-4" : "pl-7"}>
            <a
              href={`#${item.id}`}
              className="block rounded-2xl px-3 py-2.5 text-[#444774] transition-all duration-200 hover:bg-[#f3efff] hover:text-[#4d40da] hover:translate-x-0.5"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
