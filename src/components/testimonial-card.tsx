import { Quote } from "lucide-react";

import type { Testimonial } from "@/src/features/home/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="border-border bg-card flex h-full flex-col rounded-lg border p-6 shadow-sm sm:p-7">
      <Quote
        aria-hidden="true"
        className="text-brand-gold mb-5 size-7"
        strokeWidth={2.5}
      />
      <blockquote className="text-brand-navy flex-1 text-base leading-7">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="border-border mt-6 border-t pt-4">
        <p className="text-brand-navy font-semibold">{testimonial.name}</p>
        <p className="text-brand-slate mt-1 text-sm">
          {testimonial.title} · {testimonial.organization}
        </p>
      </figcaption>
    </figure>
  );
}
