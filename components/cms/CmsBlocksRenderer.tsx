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
    const imageWrapClass =
      block.align === "left"
        ? "mr-auto max-w-[72%]"
        : block.align === "right"
          ? "ml-auto max-w-[72%]"
          : block.align === "full"
            ? "w-full"
            : "mx-auto max-w-[84%]";
    return (
      <figure key={`image-${index}`} className={`space-y-3 ${imageWrapClass}`}>
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

  if (block.type === "stats") {
    return (
      <section
        key={`stats-${index}`}
        className="relative overflow-hidden rounded-[2.25rem] border border-[#cdc6ff] bg-[linear-gradient(135deg,#0b0f1f_0%,#0a1330_54%,#090d18_100%)] p-5 md:p-7 shadow-[0_30px_70px_rgba(42,33,122,0.18)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(110,92,255,0.24),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(73,189,255,0.12),transparent_18%),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:auto,auto,36px_36px,36px_36px] opacity-70" />
        <div className="relative mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c7c0ff]">Campaign Figures</p>
            <p className="mt-2 text-sm text-white/62">High-signal outcomes pulled into the body of the case study.</p>
          </div>
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
            Performance Snapshot
          </span>
        </div>
        <div className="relative grid gap-4 md:grid-cols-3">
          {block.items.map((item, itemIndex) => (
            <div
              key={`stat-${itemIndex}`}
              className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
              <div className="pointer-events-none absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#7b6bf1]/30 bg-[linear-gradient(135deg,rgba(107,87,230,0.16),rgba(54,164,255,0.08))] text-[#8a79ff]">
                <span className="text-4xl leading-none">↗</span>
              </div>
              <p className="pr-14 text-5xl md:text-6xl font-display font-bold tracking-[-0.05em] text-[#7b6bff]">
                {item.value}
              </p>
              <p className="mt-4 max-w-[11rem] text-sm font-semibold uppercase tracking-[0.14em] text-white/90 md:text-base">
                {item.label}
              </p>
              <div className="mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7b6bff]" />
                Verified result
              </div>
            </div>
          ))}
        </div>
      </section>
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
