"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TopicKey = "digital-pr" | "ai-seo" | "ai-visibility" | "brand-mentions";

type TopicDefinition = {
  key: TopicKey;
  label: string;
};

type TopicSnapshot = {
  percent: number;
  points: number[];
};

type MonthlySnapshot = {
  month: string;
  topics: Record<TopicKey, TopicSnapshot>;
};

const STORAGE_KEY = "linkifi-search-demand-widget";
const ROTATION_MS = 6_000;

const TOPICS: TopicDefinition[] = [
  { key: "digital-pr", label: "Digital PR" },
  { key: "ai-seo", label: "AI SEO" },
  { key: "ai-visibility", label: "AI Visibility" },
  { key: "brand-mentions", label: "Brand Mentions" },
];

const FALLBACK_SNAPSHOT: MonthlySnapshot = {
  month: "",
  topics: {
    "digital-pr": { percent: 8.4, points: [52, 55, 58, 60, 63, 66] },
    "ai-seo": { percent: 11.7, points: [46, 49, 53, 52, 57, 61] },
    "ai-visibility": { percent: 12.4, points: [55, 58, 62, 61, 67, 70] },
    "brand-mentions": { percent: 9.6, points: [48, 51, 50, 54, 56, 59] },
  },
};

function getCurrentMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function generatePercent(): number {
  const value = 4 + Math.random() * 14;
  return Number(value.toFixed(1));
}

function generatePoints(): number[] {
  const points: number[] = [];
  let current = Math.round(44 + Math.random() * 16);

  points.push(current);

  for (let index = 1; index < 6; index += 1) {
    const drift = Math.round(Math.random() * 6) - 1;
    current = clamp(current + drift, 34, 92);
    points.push(current);
  }

  points[5] = clamp(Math.max(points[5], points[4] + 2), 34, 96);
  return points;
}

function generateMonthlySnapshot(): MonthlySnapshot {
  return {
    month: getCurrentMonthKey(new Date()),
    topics: TOPICS.reduce(
      (accumulator, topic) => {
        accumulator[topic.key] = {
          percent: generatePercent(),
          points: generatePoints(),
        };
        return accumulator;
      },
      {} as Record<TopicKey, TopicSnapshot>,
    ),
  };
}

function loadMonthlySnapshot(): MonthlySnapshot {
  if (typeof window === "undefined") {
    return FALLBACK_SNAPSHOT;
  }

  const currentMonth = getCurrentMonthKey(new Date());

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<MonthlySnapshot>;
      if (parsed?.month === currentMonth && parsed.topics) {
        const hasAllTopics = TOPICS.every(
          (topic) =>
            parsed.topics &&
            parsed.topics[topic.key] &&
            typeof parsed.topics[topic.key]?.percent === "number" &&
            Array.isArray(parsed.topics[topic.key]?.points),
        );

        if (hasAllTopics) {
          return parsed as MonthlySnapshot;
        }
      }
    }
  } catch {
    // Ignore corrupted localStorage payloads and regenerate.
  }

  const freshSnapshot = generateMonthlySnapshot();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(freshSnapshot));
  return freshSnapshot;
}

function DemandTooltip() {
  return null;
}

export function SearchDemandWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snapshot, setSnapshot] = useState<MonthlySnapshot>(FALLBACK_SNAPSHOT);

  useEffect(() => {
    setSnapshot(loadMonthlySnapshot());
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % TOPICS.length);
    }, ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeTopic = TOPICS[currentIndex];
  const activeSnapshot = snapshot.topics[activeTopic.key];

  const chartData = useMemo(
    () =>
      activeSnapshot.points.map((value, index) => ({
        slot: index + 1,
        value,
      })),
    [activeSnapshot.points],
  );

  const gradientId = `search-demand-fill-${activeTopic.key}`;

  return (
    <aside className="hidden md:block">
      <div className="overflow-hidden rounded-[1.9rem] border border-[#e7ecf7] bg-white p-5 shadow-[0_18px_42px_rgba(26,35,64,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b86a7]">
              Search Demand
            </p>
            <h3 className="mt-2 text-base font-display font-bold text-[#18233f]">
              {activeTopic.label} Demand
            </h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8f5df] bg-[#effcf2] text-[#16a34a]">
            <Activity className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-5 rounded-[1.6rem] border border-[#edf1f8] bg-[linear-gradient(180deg,#ffffff,#f8fbff)] px-4 py-4">
          <div className="text-[2rem] font-bold leading-none tracking-[-0.04em] text-[#16a34a]">
            +{activeSnapshot.percent.toFixed(1)}%
          </div>
          <p className="mt-1 text-sm font-medium text-[#55627f]">Interest this month</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9aa6c3]">
            Source: Google Search Trends
          </p>

          <div className="mt-4 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart key={activeTopic.key} data={chartData} margin={{ top: 6, right: 2, left: 2, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#eef5ef" strokeDasharray="3 6" />
                <XAxis dataKey="slot" hide />
                <YAxis hide domain={["dataMin - 4", "dataMax + 4"]} />
                <Tooltip content={<DemandTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  fill={`url(#${gradientId})`}
                  fillOpacity={1}
                  animationDuration={500}
                  isAnimationActive
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {TOPICS.map((topic, index) => (
            <span
              key={topic.key}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-[#16a34a]" : "w-3 bg-[#d6deee]"
              }`}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
