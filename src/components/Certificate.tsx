import { Guilloche, GuillocheBand } from "./Guilloche";
import { Seal } from "./Mark";
import { Blank } from "./ui/Section";
import { BuyButton } from "./BuyButton";
import { launchConfig, siteConfig } from "@/lib/site-config";
import { hoodAsset } from "@/lib/payout";

/**
 * The hero is the product's own certificate, and pre-launch every field on
 * it is blank. That is not a placeholder state waiting to be prettied up: an
 * unissued certificate is exactly what this project is today, and a hero
 * carrying invented holder names and share counts would be the first lie on
 * the page.
 */
function Field({
  label,
  value,
  width,
}: {
  label: string;
  value?: string | null;
  width?: string;
}) {
  return (
    <div className="min-w-0">
      <p className="label">{label}</p>
      <p className="mt-2 text-[15px] sm:text-[17px]">
        <Blank value={value} width={width ?? "7rem"} className="w-full" />
      </p>
    </div>
  );
}

export function Certificate() {
  const { feeDescription, epochDescription, tokenAddress } = launchConfig;

  return (
    <div className="relative px-4 pt-10 pb-4 sm:px-6 sm:pt-14">
      <div className="rise laid card relative mx-auto max-w-[1140px] overflow-hidden px-5 py-8 sm:px-10 sm:py-12">
        {/* Engraved inner frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[10px] rounded-[2px] border border-rule-2"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[14px] rounded-[2px] border border-rule"
        />

        {/* Corner rosettes, clipped by the frame. Pushed well past the
            corner on purpose: a rosette has an empty centre, and left nearer
            the edge that hole sits under the header line and reads as a
            blemish rather than as engraving. */}
        <Guilloche
          className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 text-green"
          opacity={0.24}
        />
        <Guilloche
          className="pointer-events-none absolute -right-28 -bottom-28 h-80 w-80 text-green"
          opacity={0.16}
        />

        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="label">Robinhood Chain · Bearer token</p>
              <p className="mt-1.5 text-[11px] tracking-[0.14em] text-ink-dim uppercase">
                Certificate of participation
              </p>
            </div>
            <div className="text-right">
              <p className="label">Certificate no.</p>
              <p className="num mt-1.5 text-[13px] text-ink-faint">
                <Blank width="6rem" />
              </p>
            </div>
          </div>

          <h1 className="display mt-9 text-[clamp(3.6rem,15vw,10.5rem)] leading-[0.86] tracking-[-0.02em]">
            {siteConfig.name}
          </h1>

          <p className="mt-5 max-w-[46ch] text-[13px] leading-[1.5] tracking-[0.1em] text-ink-dim uppercase sm:text-[15px]">
            {siteConfig.tagline}
          </p>

          <p className="prose-sans mt-6 max-w-[62ch] text-[15px] leading-[1.65] text-ink-dim">
            Every trade of {siteConfig.ticker} pays a fee. The fee buys{" "}
            <span className="text-ink">tokenized {hoodAsset.symbol}</span> on
            the same chain, and the shares are sent to the wallets holding the
            token. You never claim, bridge, or hand anything to a custodian.
          </p>

          <div className="mt-10 text-green">
            <GuillocheBand className="h-5 w-full" />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Holder of record" />
            <Field label={`${hoodAsset.symbol} accrued`} />
            <Field label="Fee routed to holders" value={feeDescription} />
            <Field label="Distribution" value={epochDescription} />
          </div>

          <div className="mt-10 flex flex-col gap-8 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-6">
              <Seal className="h-24 w-24 shrink-0 text-green sm:h-28 sm:w-28" />
              <div className="pb-1">
                <p className="label">Authorised by</p>
                <p className="mt-2 text-[13px]">
                  <Blank value={tokenAddress} width="12rem" />
                </p>
                <p className="prose-sans mt-2 max-w-[34ch] text-[11px] leading-relaxed text-ink-faint">
                  No signature, and no signatory. When there is a contract, its
                  address is the only authority on this page.
                </p>
              </div>
            </div>

            <div
              className="stamp shrink-0 self-start sm:self-end"
              style={{ transform: "rotate(-6deg)" }}
            >
              Not issued · pre-launch
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1140px] flex-col items-start gap-5 sm:flex-row sm:items-center">
        <BuyButton />
        <a
          href="#mechanism"
          className="inline-flex items-center gap-2 border-b border-rule-2 pb-0.5 text-[11px] tracking-[0.18em] text-ink-dim uppercase transition hover:border-green hover:text-green"
        >
          Read the mechanism <span aria-hidden>↓</span>
        </a>
      </div>
    </div>
  );
}
