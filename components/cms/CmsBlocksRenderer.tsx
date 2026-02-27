import type { CmsBlock } from "@/lib/cms-types";
import { getBlockHeadingId } from "@/lib/cms-render";

type Props = {
  blocks: CmsBlock[];
};

export function renderCmsBlock(block: CmsBlock, index: number) {
  if (block.type === "heading") {
    const id = getBlockHeadingId(block, index);
    if (block.level === 2) {
      return (
        <h2 key={id} id={id} className="text-3xl font-display font-bold text-[#11111f] scroll-mt-28">
          {block.text}
        </h2>
      );
    }

    if (block.level === 3) {
      return (
        <h3 key={id} id={id} className="text-2xl font-display font-bold text-[#14142a] scroll-mt-28">
          {block.text}
        </h3>
      );
    }

    return (
      <h4 key={id} id={id} className="text-xl font-display font-semibold text-[#20203a] scroll-mt-28">
        {block.text}
      </h4>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p key={`paragraph-${index}`} className="text-lg leading-relaxed text-[#2e3050] whitespace-pre-wrap">
        {block.text}
      </p>
    );
  }

  if (block.type === "image") {
    return (
      <figure key={`image-${index}`} className="space-y-3">
        <img
          src={block.src}
          alt={block.alt}
          className="w-full rounded-2xl border border-[#dfdef5] bg-white object-cover"
          loading="lazy"
        />
        {block.caption ? (
          <figcaption className="text-sm text-[#62658a] text-center">{block.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "faq") {
    return (
      <details
        key={`faq-${index}`}
        className="rounded-2xl border border-[#dddaf9] bg-[#f6f5ff] px-5 py-4 group"
      >
        <summary className="cursor-pointer list-none text-lg font-semibold text-[#1c1d33] flex items-center justify-between gap-4">
          <span>{block.question}</span>
          <span className="text-[#5A4DBF] transition-transform group-open:rotate-45">+</span>
        </summary>
        <p className="mt-3 text-[#3d3f62] leading-relaxed whitespace-pre-wrap">{block.answer}</p>
      </details>
    );
  }

  if (block.type === "table") {
    return (
      <figure key={`table-${index}`} className="space-y-3 overflow-x-auto">
        <table className="min-w-full border-collapse rounded-xl overflow-hidden border border-[#dad8f5] text-left text-sm bg-white">
          <thead className="bg-[#f2f0ff] text-[#1c1d33]">
            <tr>
              {block.headers.map((header, cellIndex) => (
                <th key={`header-${cellIndex}`} className="px-4 py-3 font-semibold border-b border-[#dad8f5]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="odd:bg-white even:bg-[#faf9ff]">
                {block.headers.map((_, colIndex) => (
                  <td key={`cell-${rowIndex}-${colIndex}`} className="px-4 py-3 border-b border-[#ecebfb] text-[#2d2f4c]">
                    {row[colIndex] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {block.caption ? <figcaption className="text-sm text-[#62658a]">{block.caption}</figcaption> : null}
      </figure>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={`quote-${index}`}
        className="rounded-2xl border-l-4 border-[#6b57e6] bg-[#f7f6ff] px-6 py-5"
      >
        <p className="text-xl text-[#1f2041] font-medium">“{block.text}”</p>
        {block.cite ? <cite className="mt-3 block text-sm not-italic text-[#5e6086]">{block.cite}</cite> : null}
      </blockquote>
    );
  }

  return block.ordered ? (
    <ol key={`list-${index}`} className="list-decimal pl-6 space-y-2 text-[#2e3050] text-lg">
      {block.items.map((item, itemIndex) => (
        <li key={`item-${itemIndex}`}>{item}</li>
      ))}
    </ol>
  ) : (
    <ul key={`list-${index}`} className="list-disc pl-6 space-y-2 text-[#2e3050] text-lg">
      {block.items.map((item, itemIndex) => (
        <li key={`item-${itemIndex}`}>{item}</li>
      ))}
    </ul>
  );
}

export function CmsBlocksRenderer({ blocks }: Props) {
  return <div className="space-y-7">{blocks.map((block, index) => renderCmsBlock(block, index))}</div>;
}
