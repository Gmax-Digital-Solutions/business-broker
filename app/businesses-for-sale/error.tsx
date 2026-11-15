"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function BusinessesForSaleError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Businesses for sale page failed to load.", error);
  }, [error]);

  return (
    <main className="bg-brand-offwhite flex min-h-[70vh] flex-1 items-center justify-center px-5 py-16">
      <div className="border-border bg-card w-full max-w-xl rounded-lg border p-8 text-center">
        <h1 className="font-heading text-brand-navy text-2xl font-semibold">
          Opportunities are temporarily unavailable
        </h1>
        <p className="text-brand-slate mt-3 text-sm leading-6">
          We couldn’t load the current listings. Please try again in a moment.
        </p>
        <Button className="mt-6" onClick={retry} type="button">
          Try again
        </Button>
      </div>
    </main>
  );
}
