import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingLevel?: "h1" | "h2";
  inverse?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  headingLevel = "h2",
  inverse = false,
  className,
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;

  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "font-heading text-xs font-bold tracking-[0.16em] uppercase",
            inverse ? "text-brand-gold" : "text-brand-bronze",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        className={cn(
          "font-heading text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          inverse ? "text-primary-foreground" : "text-brand-navy",
        )}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-7 sm:text-lg",
            align === "center" && "mx-auto",
            inverse ? "text-primary-foreground/80" : "text-brand-slate",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
