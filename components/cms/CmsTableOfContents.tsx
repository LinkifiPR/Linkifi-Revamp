import type { TocItem } from "@/lib/cms-render";

type Props = {
  items: TocItem[];
};

export function CmsTableOfContents({ items }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-[#dcdaf5] bg-white p-5 shadow-[0_10px_28px_rgba(26,20,78,0.06)]">
      <p className="text-xs uppercase tracking-[0.16em] text-[#676a95] font-semibold">On This Page</p>
      <ul className="mt-3 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 2 ? "" : item.level === 3 ? "pl-3" : "pl-6"}>
            <a href={`#${item.id}`} className="text-[#383b63] hover:text-[#5A4DBF] transition-colors">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
