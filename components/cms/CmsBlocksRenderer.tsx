import { ArrowUpRight } from "lucide-react";
import type { CmsBlock } from "@/lib/cms-types";
import { getBlockHeadingId } from "@/lib/cms-render";

type Props = {
  blocks: CmsBlock[];
};

function splitStatLabel(label: string): [string, string] {
  const normalized = label.trim().replace(/\s+/g, " ");
  const words = normalized.split(" ").filter(Boolean);

  if (words.length <= 1) {
    return [normalized, ""];
  }

  if (words.length === 2) {
    return [words[0], words[1]];
  }

  let bestIndex = 1;
  let bestDifference = Number.POSITIVE_INFINITY;

  for (let index = 1; index < words.length; index += 1) {
    const left = words.slice(0, index).join(" ");
    const right = words.slice(index).join(" ");
    const difference = Math.abs(left.length - right.length);

    if (difference < bestDifference) {
      bestDifference = difference;
      bestIndex = index;
    }
  }

  return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
}

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
        className="rounded-[2rem] border border-[#e8e3ff] bg-[linear-gradient(180deg,#faf8ff_0%,#f4f6ff_100%)] p-5 shadow-[0_18px_46px_rgba(43,37,106,0.07)]"
      >
        <div className="mb-5 flex items-center gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b61c7]">Campaign Figures</p>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(107,97,199,0.26),rgba(107,97,199,0.03))]" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {block.items.map((item, itemIndex) => {
            const [labelLineOne, labelLineTwo] = splitStatLabel(item.label);

            return (
              <div
                key={`stat-${itemIndex}`}
                className="group relative flex min-h-[10.25rem] flex-col justify-between overflow-hidden rounded-[1.55rem] border border-[#e4defd] bg-[linear-gradient(180deg,#ffffff,#fbfaff)] px-5 py-5 shadow-[0_10px_22px_rgba(88,72,194,0.05)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#6d5dff,#48b5ff)] opacity-90" />
                <div className="pointer-events-none absolute right-4 top-4 text-[#7a6dff] drop-shadow-[0_0_10px_rgba(122,109,255,0.18)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-safe:animate-[pulse_5.8s_ease-in-out_infinite]">
                  <ArrowUpRight className="h-5 w-5 stroke-[2]" />
                </div>
                <div className="grid flex-1 grid-rows-[3.6rem_3.7rem]">
                  <div className="flex items-end">
                    <p
                      className="max-w-full pr-10 font-display font-bold leading-none tracking-[-0.055em] text-[#6b5cff] tabular-nums whitespace-nowrap text-[clamp(2rem,2.7vw,3rem)]"
                    >
                      {item.value}
                    </p>
                  </div>
                  <div className="grid h-[3.7rem] w-full grid-rows-2 content-start">
                    <span className="w-full text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-[0.12em] text-[#232644]">
                      {labelLineOne}
                    </span>
                    <span className="w-full text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-[0.12em] text-[#232644]">
                      {labelLineTwo || "\u00A0"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="h-px w-full bg-[linear-gradient(90deg,rgba(109,93,255,0.16),rgba(109,93,255,0.02))]" />
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7b80a4]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7e70ff]" />
                    Tracked Metric
                  </div>
                </div>
              </div>
            );
          })}
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
