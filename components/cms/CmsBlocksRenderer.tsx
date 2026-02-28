import { ArrowUpRight } from "lucide-react";
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
        className="relative overflow-hidden rounded-[2.1rem] border border-[#171d42] bg-[linear-gradient(135deg,#0a1024_0%,#10183d_48%,#0a0f20_100%)] p-4 md:p-5 shadow-[0_28px_70px_rgba(23,21,66,0.18)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(118,103,255,0.18),transparent_24%),radial-gradient(circle_at_86%_18%,rgba(79,185,255,0.1),transparent_16%),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px,42px_42px]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(163,151,255,0.45),transparent)]" />
        <div className="relative mb-4 flex items-center gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d5ceff]">Campaign Figures</p>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(133,118,255,0.32),rgba(255,255,255,0.02))]" />
        </div>
        <div className="relative grid gap-3 md:grid-cols-3">
          {block.items.map((item, itemIndex) => (
            <div
              key={`stat-${itemIndex}`}
              className="group relative flex min-h-[10.5rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:min-h-[11.25rem]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_14%,rgba(123,107,255,0.1),transparent_22%)]" />
              <div className="pointer-events-none absolute right-3 top-3 h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(128,113,255,0.18),transparent_66%)] blur-xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
              <div className="pointer-events-none absolute right-4 top-4 text-[#8576ff] drop-shadow-[0_0_10px_rgba(133,118,255,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-6 w-6 stroke-[1.9]" />
              </div>
              <div>
                <p className="pr-8 text-[clamp(3rem,8vw,4.8rem)] font-display font-bold leading-none tracking-[-0.055em] text-[#8475ff]">
                  {item.value}
                </p>
                <p className="mt-3 max-w-[9.5rem] text-[0.9rem] font-semibold uppercase leading-[1.42] tracking-[0.17em] text-[#f3f3ff]">
                  {item.label}
                </p>
              </div>
              <div>
                <div className="h-px w-full bg-[linear-gradient(90deg,rgba(128,113,255,0.28),rgba(255,255,255,0.02))]" />
                <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a9afd0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7e70ff]" />
                  Tracked Metric
                </div>
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
