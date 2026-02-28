import type { TocItem } from "@/lib/cms-render";

type Props = {
  items: TocItem[];
};

export function CmsTableOfContents({ items }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="overflow-hidden rounded-[2rem] border border-[#ddd8ff] bg-white shadow-[0_18px_40px_rgba(71,56,218,0.07)]">
      <div className="border-b border-[#ece8ff] bg-[linear-gradient(135deg,#f8f5ff,#ffffff)] px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#6e69a6] font-semibold">On This Page</p>
      </div>
      <ul className="space-y-3 px-5 py-5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 2 ? "" : item.level === 3 ? "pl-4" : "pl-7"}>
            <a
              href={`#${item.id}`}
              className="block rounded-xl px-3 py-2 text-[#3a3d66] transition-colors hover:bg-[#f5f1ff] hover:text-[#4d40da]"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
