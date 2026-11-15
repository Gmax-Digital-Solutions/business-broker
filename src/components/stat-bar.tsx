import type { StatItem } from "@/src/features/home/types";

type StatBarProps = {
  items: StatItem[];
};

export function StatBar({ items }: StatBarProps) {
  return (
    <section
      aria-label="Business Broker World at a glance"
      className="border-border bg-card border-y"
    >
      <dl className="divide-border mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y px-4 sm:px-8 md:grid-cols-4 md:divide-y-0 lg:px-10">
        {items.map((item) => (
          <div
            className="flex min-h-28 flex-col justify-center gap-1 px-4 py-5 text-center sm:px-6 md:min-h-32"
            key={item.label}
          >
            <dd className="font-heading text-brand-navy text-2xl font-semibold tracking-tight sm:text-3xl">
              {item.value}
            </dd>
            <dt className="text-brand-slate text-xs leading-5 font-medium sm:text-sm">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
