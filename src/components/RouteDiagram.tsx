import { clsx } from "clsx";
import { launchConfig } from "@/lib/site-config";
import { hoodAsset } from "@/lib/payout";

/**
 * The route a fee takes, drawn as a wiring schematic rather than an
 * illustration. Five stages, one lane: this token has a single payout asset,
 * which is the whole difference between it and a fund.
 *
 * Stage 4 is the one that is not proven — the swap can only exist if a
 * tokenized HOOD market exists on this chain — so it carries the unissued
 * mark rather than being drawn as solid as the rest.
 */
const stages = [
  {
    index: "1",
    title: "A trade",
    body: "Someone buys or sells the token on Robinhood Chain.",
    settled: true,
  },
  {
    index: "2",
    title: "A fee",
    body:
      launchConfig.feeDescription ??
      "A fixed percentage is withheld by the token contract. The size is not decided yet.",
    settled: launchConfig.feeDescription !== null,
  },
  {
    index: "3",
    title: "The vault",
    body: "Fees accumulate in the router until the distribution runs.",
    settled: true,
  },
  {
    index: "4",
    title: "The swap",
    body: `The vault buys tokenized ${hoodAsset.symbol} on chain. Requires a market for it — see § 03.`,
    settled: false,
  },
  {
    index: "5",
    title: "Your wallet",
    body: `The ${hoodAsset.symbol} is transferred to holders pro rata. Nothing to claim.`,
    settled: true,
  },
];

export function RouteDiagram() {
  return (
    <div className="card overflow-hidden">
      <div className="card-head">
        <span>Fee → share, one lane</span>
        <span className="text-ink-faint">
          {launchConfig.epochDescription ?? "cadence undecided"}
        </span>
      </div>

      {/* The rail. Decorative on top of a list that already reads in order,
          so it is hidden from AT and from narrow screens where the stages
          stack vertically and a horizontal rail would be a lie. */}
      <div className="hidden px-6 pt-8 lg:block">
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="h-10 w-full text-green"
          aria-hidden
          focusable="false"
        >
          <line
            x1="100"
            y1="20"
            x2="900"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
          <line
            x1="100"
            y1="20"
            x2="900"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="10 22"
            className="animate-flow"
          />
          {[100, 300, 500, 700, 900].map((x) => (
            <g key={x}>
              <circle
                cx={x}
                cy="20"
                r="5"
                fill="var(--paper-2)"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <line
                x1={x}
                y1="25"
                x2={x}
                y2="38"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      <ol className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-5 lg:bg-transparent lg:gap-6 lg:p-6 lg:pt-2">
        {stages.map((stage) => (
          <li
            key={stage.index}
            className="bg-paper-2 p-5 lg:bg-transparent lg:p-0"
          >
            <div className="flex items-baseline gap-2">
              <span
                className={clsx(
                  "num text-[11px]",
                  stage.settled ? "text-green" : "text-stamp",
                )}
              >
                {stage.index}
              </span>
              <p className="text-[11px] tracking-[0.16em] uppercase">
                {stage.title}
              </p>
            </div>
            <p className="prose-sans mt-2.5 text-[12.5px] leading-relaxed text-ink-dim">
              {stage.body}
            </p>
            {!stage.settled && (
              <p className="mt-2.5 text-[10px] tracking-[0.16em] text-stamp uppercase">
                unproven
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
