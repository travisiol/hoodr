import { siteConfig } from "@/lib/site-config";

/**
 * The band carries the sentence, not a price. Sibling projects in this
 * account run a scrolling ticker of quotes; there are no quotes to run here
 * that would not be invented, so the marquee says what the mechanism does —
 * and carries the affiliation disclaimer at the same size as the pitch,
 * which is the only place a disclaimer is honest.
 */
const phrases = [
  `HOLD ${siteConfig.ticker}`,
  "THE FEE BUYS HOOD",
  "THE HOOD LANDS IN YOUR WALLET",
  "NO BRIDGE",
  "NO CUSTODY",
  "NOT AFFILIATED WITH ROBINHOOD MARKETS, INC.",
];

function Run() {
  return (
    <span className="flex shrink-0 items-center">
      {phrases.map((phrase) => (
        <span key={phrase} className="flex items-center">
          <span className="display px-6 text-[clamp(1.6rem,4.4vw,3.2rem)] leading-none whitespace-nowrap">
            {phrase}
          </span>
          <span aria-hidden className="text-[1.6rem] text-paper/35">
            ·
          </span>
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  return (
    <div className="mt-10 bg-ink py-6 text-paper">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex min-w-max">
          <Run />
          {/* The duplicate is what makes a -50% translation seamless. */}
          <span aria-hidden className="flex">
            <Run />
          </span>
        </div>
      </div>
    </div>
  );
}
