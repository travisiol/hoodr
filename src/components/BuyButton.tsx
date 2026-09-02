"use client";

import { useId } from "react";
import { clsx } from "clsx";
import { launchConfig, siteConfig } from "@/lib/site-config";

/**
 * Disabled until the token exists, with the reason printed on the button
 * rather than hidden in a tooltip. A dead-but-pretty Buy button is where a
 * pre-launch site usually starts lying.
 */
export function BuyButton({
  className,
  onDark = false,
}: {
  className?: string;
  /** The ink panel needs paper-side colours; ink on ink is an invisible button. */
  onDark?: boolean;
}) {
  // This button renders twice on the page, so the reason text it points at
  // cannot carry a hardcoded id.
  const reasonId = useId();

  if (launchConfig.isLive && launchConfig.buyUrl) {
    return (
      <a
        href={launchConfig.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-[2px] bg-green px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase transition hover:bg-green-ink",
          className,
        )}
      >
        Buy {siteConfig.ticker}
      </a>
    );
  }

  return (
    <span className={clsx("inline-flex flex-col gap-2", className)}>
      <button
        type="button"
        disabled
        aria-describedby={reasonId}
        className={clsx(
          "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-[2px] border px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase",
          onDark
            ? "border-paper/25 text-paper/55"
            : "border-rule-2 text-ink-faint",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "h-1 w-1 rounded-full",
            onDark ? "bg-paper/60" : "bg-stamp",
          )}
        />
        {siteConfig.ticker} not live
      </button>
      <span
        id={reasonId}
        className={clsx(
          "prose-sans text-[11px]",
          onDark ? "text-paper/50" : "text-ink-faint",
        )}
      >
        No token contract yet. This becomes a link to the pair once one exists.
      </span>
    </span>
  );
}
