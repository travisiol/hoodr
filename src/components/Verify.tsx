import { CardHead, Blank } from "./ui/Section";
import { Chip } from "./ui/Chip";
import { explorer, launchConfig } from "@/lib/site-config";
import { hoodAsset } from "@/lib/payout";
import { ROBINHOOD_CHAIN_ID } from "@/lib/chain";

/**
 * Every address this project will ever ask anyone to trust, in one table,
 * with an explorer link the moment it exists and a ruled blank until then.
 * No "coming soon", no truncated teaser address: a blank is checkable and a
 * teaser is not.
 */
const entries = [
  {
    label: "Token",
    value: launchConfig.tokenAddress,
    note: "The only contract you should ever buy.",
  },
  {
    label: "Router",
    value: launchConfig.routerAddress,
    note: "Collects fees, buys the share, distributes it.",
  },
  {
    label: "Treasury",
    value: launchConfig.treasuryAddress,
    note: "Anything the router does not route.",
  },
  {
    label: `${hoodAsset.symbol} token`,
    value: hoodAsset.address,
    note: "The tokenized share itself, issued by a third party.",
  },
];

export function Verify() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="card overflow-hidden">
        <CardHead
          title="Addresses"
          aside={
            launchConfig.isLive ? (
              <Chip tone="live" dot>
                Published
              </Chip>
            ) : (
              <Chip tone="unissued" dot>
                None exist yet
              </Chip>
            )
          }
        />
        <ul className="divide-y divide-[color:var(--rule)]">
          {entries.map((entry) => (
            <li
              key={entry.label}
              className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <div className="sm:w-40 sm:shrink-0">
                <p className="text-[11px] tracking-[0.16em] uppercase">
                  {entry.label}
                </p>
                <p className="prose-sans mt-1 text-[11px] text-ink-faint">
                  {entry.note}
                </p>
              </div>
              <div className="min-w-0 text-[12px] break-all">
                {entry.value ? (
                  <a
                    href={explorer.address(entry.value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="num text-green underline underline-offset-4"
                  >
                    {entry.value}
                  </a>
                ) : (
                  <Blank width="13rem" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card h-fit overflow-hidden">
        <CardHead title="Checkable today" />
        <dl className="divide-y divide-[color:var(--rule)]">
          <div className="p-5">
            <dt className="label">Chain ID</dt>
            <dd className="num mt-1.5 text-[14px]">{ROBINHOOD_CHAIN_ID}</dd>
          </div>
          <div className="p-5">
            <dt className="label">Payout claims</dt>
            <dd className="prose-sans mt-1.5 text-[12px] leading-relaxed text-ink-dim">
              None. No distribution has run, so there is nothing to audit and
              nobody has been paid anything.
            </dd>
          </div>
          <div className="p-5">
            <dt className="label">Custody</dt>
            <dd className="prose-sans mt-1.5 text-[12px] leading-relaxed text-ink-dim">
              This site holds nothing, signs nothing, and stores nothing. It
              reads block height and gas price, and that is the extent of its
              contact with the chain.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
