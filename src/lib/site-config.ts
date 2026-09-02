/**
 * The whole brand lives in the three strings at the top of `siteConfig`
 * (`name`, `wordmark`, `ticker`) plus the `NEXT_PUBLIC_HOODR_*` env prefix.
 * Nothing else in the codebase spells the name out, so a rename is those
 * strings and the prefix — never a grep-and-replace through components.
 */
export const siteConfig = {
  name: "HOODR",
  wordmark: "Hoodr",
  ticker: "$HOODR",

  tagline: "HOLD THE TOKEN. GET PAID IN HOOD.",
  description:
    "A Robinhood Chain token whose trading fees buy tokenized HOOD shares and send them straight to holders. The payout asset lives on the same chain the token trades on, so nothing is bridged, wrapped, or held for you.",
  seoDescription:
    "Trading fees on Robinhood Chain buy tokenized HOOD shares and route them to holders. No bridge, no custody, no promises about price.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoodr.example",
  x: "https://x.com/hoodr_onchain",

  /**
   * Shown in full in the footer and abbreviated wherever the Robinhood name
   * appears next to ours. This project has no relationship with the company
   * whose stock it intends to buy, and the site must never let a reader
   * assume otherwise.
   */
  affiliationNotice:
    "HOODR is an independent project. It is not affiliated with, endorsed by, sponsored by or connected to Robinhood Markets, Inc. “HOOD” is used only as the ticker of a publicly traded company, to name the asset this token intends to buy.",
} as const;

/** Treats both "unset" and "" the same way: not configured yet. */
export function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

/**
 * Launch surface. Every value here is env-driven and unset by default: an
 * address that is not real must never be able to reach a build.
 *
 * `isLive` is the single switch the rest of the app reads, and it requires
 * three things — the flag, the token, and the router — because a "live" flag
 * with no contracts behind it is exactly the lie this repo exists to avoid.
 */
const tokenAddress = envOrNull(process.env.NEXT_PUBLIC_HOODR_TOKEN_ADDRESS);
const routerAddress = envOrNull(process.env.NEXT_PUBLIC_HOODR_ROUTER_ADDRESS);

export const launchConfig = {
  isLive:
    process.env.NEXT_PUBLIC_HOODR_LIVE === "true" &&
    tokenAddress !== null &&
    routerAddress !== null,
  tokenAddress,
  /** Contract that swaps collected fees into tokenized HOOD and distributes it. */
  routerAddress,
  treasuryAddress: envOrNull(process.env.NEXT_PUBLIC_HOODR_TREASURY_ADDRESS),
  buyUrl: envOrNull(process.env.NEXT_PUBLIC_HOODR_BUY_URL),
  launchpadUrl: envOrNull(process.env.NEXT_PUBLIC_HOODR_LAUNCHPAD_URL),
  /** e.g. "1.5% of every buy and sell" — one line, only once it is decided. */
  feeDescription: envOrNull(process.env.NEXT_PUBLIC_HOODR_FEE_DESCRIPTION),
  /** e.g. "every 6 hours" — the distribution cadence, once decided. */
  epochDescription: envOrNull(process.env.NEXT_PUBLIC_HOODR_EPOCH_DESCRIPTION),
} as const;

export const explorer = {
  base:
    process.env.NEXT_PUBLIC_ROBINHOOD_EXPLORER_URL ??
    "https://robinhoodchain.blockscout.com",
  address(addr: string) {
    return `${this.base}/address/${addr}`;
  },
} as const;
