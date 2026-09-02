import { siteConfig } from "@/lib/site-config";
import { hoodAsset } from "@/lib/payout";

const lines = [
  {
    n: "01",
    text: "A token trades on Robinhood Chain. Every trade pays a fee.",
  },
  {
    n: "02",
    text: `The fee buys tokenized ${hoodAsset.symbol} — the stock of the company whose chain the trade just happened on.`,
  },
  {
    n: "03",
    text: "The share is sent to the wallets holding the token. No claim, no bridge, no custodian.",
  },
];

export function Thesis() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <ol>
        {lines.map((line) => (
          <li
            key={line.n}
            className="flex gap-5 border-b border-rule py-6 first:pt-0 last:border-b-0"
          >
            <span className="num pt-2 text-[11px] text-green">{line.n}</span>
            <p className="display max-w-[24ch] text-[clamp(1.4rem,3.4vw,2.1rem)] leading-[1.15]">
              {line.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="lg:pt-6">
        <p className="prose-sans text-[14.5px] leading-[1.7] text-ink-dim">
          The venue and the payout are the same company. {siteConfig.ticker}{" "}
          trades on the chain Robinhood built, and the fees it collects buy the
          stock of Robinhood itself — so the payout asset is already on the
          chain where the fee was collected, and the distribution is a
          transfer rather than a bridge, a wrapper, or an IOU.
        </p>
        <p className="prose-sans mt-5 text-[14.5px] leading-[1.7] text-ink-dim">
          That symmetry is the idea, and it is worth being precise about what
          it is not. It does not make the token safe, it does not put a floor
          under the price, and it does not make anyone a shareholder of record.
          It means one thing: the reward for holding is denominated in
          something outside crypto, bought on the open market with money the
          token actually collected.
        </p>
        <p className="prose-sans mt-5 border-t border-rule pt-5 text-[12.5px] leading-relaxed text-ink-faint">
          Everything on this page that is not yet true is marked as not yet
          true. There are a lot of those marks right now.
        </p>
      </div>
    </div>
  );
}
