import { envOrNull } from "./site-config";

/**
 * The single payout asset: a tokenized HOOD share on Robinhood Chain.
 *
 * READ THIS BEFORE SETTING THE ADDRESS.
 *
 * The premise of this project — that a tokenized HOOD share is issued on
 * Robinhood Chain itself — could NOT be verified from the machine this was
 * built on. It is the brief, not a checked fact, and the whole "no bridge"
 * argument rests on it. Robinhood's own tokenized-equity product has been
 * issued on other networks in the past, and a US-listed share is exactly the
 * kind of instrument whose tokenization is jurisdiction-dependent.
 *
 * So the site states the conditions the asset must meet (below) rather than
 * asserting that it exists, and the contract address stays null until
 * somebody confirms it from the issuer. A wrong address here does not fail
 * loudly — it routes real fees into the wrong contract.
 */
export const hoodAsset = {
  symbol: "HOOD",
  name: "Robinhood Markets, Inc.",
  kind: "Tokenized share",
  /** Contract on Robinhood Chain, or null until confirmed by the issuer. */
  address: envOrNull(process.env.NEXT_PUBLIC_HOODR_ASSET_HOOD),
  /** The issuer of the tokenized share — not Robinhood, unless it is. */
  issuer: envOrNull(process.env.NEXT_PUBLIC_HOODR_ASSET_ISSUER),
} as const;

export interface Condition {
  id: string;
  title: string;
  body: string;
  /** True only when something in the environment actually proves it. */
  met: boolean;
}

/**
 * Four conditions the payout leg must satisfy before this token launches.
 * They render on the page as a checklist, unticked, because none of them is
 * proven yet. A checklist that ships pre-ticked is a brochure.
 */
export const conditions: Condition[] = [
  {
    id: "issued",
    title: "The share is tokenized on Robinhood Chain",
    body: "A HOOD-backed token, issued natively on chain 4663 — not a wrapper minted elsewhere and bridged in. If it lives on another network, the design in [02] does not hold and this project changes shape or does not ship.",
    met: hoodAsset.address !== null,
  },
  {
    id: "issuer",
    title: "The issuer is named, in public",
    body: "Whoever mints the tokenized share is the counterparty every holder is exposed to. Their name is published here before launch, next to the contract, so the risk is legible rather than implied.",
    met: hoodAsset.issuer !== null,
  },
  {
    id: "transferable",
    title: "It transfers to any wallet, without a whitelist",
    body: "Some tokenized equities only move between permissioned addresses. If HOOD cannot land in an arbitrary holder's wallet, a distribution to arbitrary holders cannot happen and the payout has to be redesigned.",
    met: false,
  },
  {
    id: "legal",
    title: "The distribution has a compliance read",
    body: "Paying holders in a tokenized equity distributes securities exposure. That question is answered by counsel before a single fee is routed — not after. This is the open item most likely to change the mechanism.",
    met: false,
  },
];

export const allConditionsMet = conditions.every((c) => c.met);
