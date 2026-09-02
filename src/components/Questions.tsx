import { siteConfig } from "@/lib/site-config";
import { hoodAsset } from "@/lib/payout";

/**
 * The unfavourable questions are in here on purpose, and near the top. A FAQ
 * that only answers the questions a buyer hopes for is marketing; the ones
 * that could talk somebody out of buying are the reason anyone believes the
 * rest of the page.
 *
 * <details> so it works with JavaScript switched off.
 */
const questions: { q: string; a: string }[] = [
  {
    q: "Does holding this actually make me a Robinhood shareholder?",
    a: `Not in the legal sense the phrase implies. You would receive a tokenized ${hoodAsset.symbol} share: a token issued by a third party whose value tracks the stock and whose backing is that issuer's obligation. Whether it carries registered ownership, dividends or voting rights is entirely a property of how the issuer structured it, and it is not the same instrument as shares held through a broker. "You become a shareholder" is the slogan. This paragraph is the fact.`,
  },
  {
    q: "Is this connected to Robinhood?",
    a: siteConfig.affiliationNotice,
  },
  {
    q: `What if tokenized ${hoodAsset.symbol} does not exist on this chain?`,
    a: "Then the design in § 02 does not hold. The no-bridge argument is the entire reason this token is on Robinhood Chain and not somewhere else, and a payout asset that lives on another network would mean bridging, wrapping, or holding funds for people — all three of which this project exists to avoid. The condition is published in § 03 precisely because it is not yet proven.",
  },
  {
    q: "Can I lose money?",
    a: `Yes, in two independent ways. The token can fall, and ${hoodAsset.symbol} can fall — a payout in a falling asset is still a falling asset. There is no floor, no buyback, and nothing about this mechanism that supports the token's own price.`,
  },
  {
    q: "What happens if nobody trades?",
    a: "You get nothing. The payout is a share of trading fees, so at zero volume it is zero. This is not a yield, it is a cut of activity that may not happen, and it stops the moment interest does.",
  },
  {
    q: "The stock market closes. What about the fees collected at 3am?",
    a: "They wait. Tokenized equities generally price against a market that is shut at night and at weekends, and liquidity in them outside those hours is thin at best. The distribution schedule has to be built around that — it is one of the open decisions in § 07, and any project that does not mention it has not thought about it.",
  },
  {
    q: "Do you take custody of anything?",
    a: "No. This site connects to a wallet to read an address and nothing else — it cannot move funds, and there is no contract behind it to move them with. At launch, fees would sit in a router contract whose address is published in § 06 before it holds anything.",
  },
  {
    q: "Is this a security?",
    a: "Unanswered, and it is the open decision most likely to change or end the project. Distributing a tokenized equity to token holders distributes securities exposure, which is a different question from whether the token itself is one. This gets a lawyer's answer before a single fee is routed, not after.",
  },
  {
    q: "Why is every number on this page blank?",
    a: "Because there is nothing to measure. No token, no router, no distribution, no holders. Filling those fields with plausible figures for the sake of a screenshot is the exact thing that makes a pre-launch page worthless, so this one shows blanks and says why.",
  },
  {
    q: "When does it launch?",
    a: "There is no date, and there will not be one until § 03 and § 07 are resolved. Anything on X promising a countdown for this project before that happens did not come from the people building it.",
  },
];

export function Questions() {
  return (
    <div className="border-t border-rule">
      {questions.map((item) => (
        <details key={item.q} className="qa border-b border-rule">
          <summary className="text-[14px] leading-snug">
            <span className="text-green">?</span>
            <span className="max-w-[62ch]">{item.q}</span>
          </summary>
          <p className="prose-sans max-w-[74ch] pb-5 pl-[calc(0.75rem+1ch)] text-[13.5px] leading-relaxed text-ink-dim">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
