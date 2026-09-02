# HOODR

**Hold the token. Get paid in HOOD.**

A pre-launch site for a Robinhood Chain token whose trading fees buy tokenized
HOOD shares and send them to holders. The meta-play is the pitch: the token
trades on the chain Robinhood built, and the fee it collects buys the stock of
Robinhood itself — so the payout asset is already on the chain where the fee
was collected, and the distribution is a transfer rather than a bridge.

There is **no token, no contract, and no distribution**. This repository is the
landing page and the argument, built so that nothing on it can pretend
otherwise.

---

## The premise is not verified, and the site says so

The whole design rests on one unverified fact: **that a tokenized HOOD share is
issued natively on Robinhood Chain**. That could not be confirmed from the
machine this was built on. It is the brief, not a checked fact.

So `src/lib/payout.ts` states it as a **condition** rather than an assertion,
and § 03 of the page renders those conditions as an unticked checklist:

1. The share is tokenized on Robinhood Chain (not bridged in from elsewhere).
2. The issuer is named, in public — every holder is exposed to that counterparty.
3. It transfers to any wallet, without a permissioned whitelist.
4. The distribution has a compliance read.

Boxes 1 and 2 tick themselves the moment `NEXT_PUBLIC_HOODR_ASSET_HOOD` and
`NEXT_PUBLIC_HOODR_ASSET_ISSUER` are set. **Set them only from the issuer's own
publication.** A wrong address does not fail loudly — it routes real fees into
the wrong contract.

If the tokenized share turns out to live on another network, the no-bridge
argument collapses and the project changes shape or does not ship. That is
stated on the page, not buried here.

## Two more things worth being blunt about

**Trademark.** "HOOD" is used as the ticker of a publicly traded company, to
name the asset the token intends to buy. The project has no relationship with
Robinhood Markets, Inc., the site says so in the footer at reading size, in the
marquee at the same size as the pitch, and on the OpenGraph card that
circulates on X. Naming a project after another company's brand still carries
trademark exposure that no disclaimer removes — worth a lawyer's opinion
alongside the securities question below.

**"You become a shareholder" is a slogan.** A tokenized share is a claim issued
by a third party, not shares held through a broker; it may carry no voting
rights and no registered ownership. The FAQ answers this as the first question,
before anything flattering.

## Open decisions

None of these is decided, and none is faked on the site. They are published in
§ 07 where a launch page would normally put a roadmap:

| # | Decision | Why it is not cosmetic |
|---|----------|------------------------|
| 01 | Fee size | Large enough to be worth holding is large enough to strangle the volume that funds it |
| 02 | Distribution cadence | Gas is paid per run whether it moves $8 or $8,000 |
| 03 | Push vs claim | Claiming scales, and quietly keeps what nobody claims |
| 04 | Which tokenized HOOD | If several issuers exist, this is a counterparty choice, not a ticker choice |
| 05 | Below-dust holders | A share that rounds below its own gas cost has to go somewhere |
| 06 | The compliance read | Distributing a tokenized equity distributes securities exposure. May end the project. |

## Pre-launch discipline

The rules the code enforces, so a screenshot can never say more than the truth:

- **Every project figure is a ruled blank, not a zero.** `src/lib/data.ts`
  holds zeros and `LIVE_DATA_ENABLED = false`; the UI renders `—` on a rule.
  Blanks are checkable, plausible numbers are not.
- **Every address renders as a blank** until its env var is set, then becomes an
  explorer link. No truncated teaser addresses.
- **Buy is disabled with the reason on the button**, not in a tooltip.
- **`isLive` requires three things** — the flag, a token address and a router
  address. A live flag with no contracts behind it is the exact lie this repo
  avoids.
- **The calculator starts empty.** A pre-filled fee and a pre-filled volume
  would be a forecast wearing a calculator's clothes.
- **The one live panel is labelled as such.** § 04 reads block height and gas
  price from the RPC in the visitor's own browser, directly above the project's
  own blank register. The chain is real; the project is not live; the page
  shows both rather than borrowing the credibility of the first for the second.
  It says *last read*, not *last block* — Robinhood Chain produces blocks far
  faster than the 6s poll, so what is a few seconds old is the panel.

## Art direction

An engraved share certificate, not a trading terminal. Warm paper `#efeae0`,
ink `#14120e`, one engraving green `#14603a`, one stamp red `#a3372a`. Colour
is a semantic: green = real or confirmed, stamp = unissued or undecided, ink =
everything else.

- Instrument Serif for display, Inter for prose, JetBrains Mono for anything
  structural. Loaded by runtime `<link>` rather than `next/font`, which needs
  outbound access to Google Fonts at *build* time.
- The guilloche rosette and band in `src/components/Guilloche.tsx` are real
  hypotrochoids computed from the formula, not images — deterministic, because
  server and client must produce byte-identical path data or hydration breaks.
- The hero is the product's own certificate with every field blank and a
  rotated "not issued" stamp. That is not a placeholder waiting to be prettied
  up; it is what this project is today.
- Text colours were set by eye and then **measured**: the first pass had 10px
  labels at 2.5:1 against the paper, a failing grade at exactly the size they
  are used. `--ink-dim` and `--ink-faint` now measure 7.4:1 and 4.6:1.

## Runtime traps hit while building this

Each of these cost real time; they are here so the next project does not repay
for them.

- **A `"use client"` module's exports are client *references* when a server
  component imports them.** Sharing the nav array from `NavLinks.tsx` into the
  server-rendered footer produced a proxy and a prerender crash —
  `navLinks.map is not a function`. Shared data crossing that boundary lives in
  `src/lib/nav.ts`, a module with no directive at all.
- **Scroll-driven reveals evaluate to progress 0 in some rendering contexts.**
  `animation-timeline: view()` is the right way to do a scroll reveal — no
  observer, no class toggling, nothing that can strand content invisible — but
  a renderer that never scrolls paints every revealed section at opacity 0.
  There is a `@media print` override that neutralises it; the browser-pane
  screenshots that first surfaced this were a red herring (see below).
- **A hidden preview pane screenshots as a flat rectangle of the page's
  background colour.** Not black, not an error — the page's own ground, which
  looks exactly like a page that rendered nothing. Verify by DOM measurement
  (`getBoundingClientRect`, computed styles) rather than by capture.
- **React 19 does not execute a `<script>` rendered inside a component**, and
  mutating `<html>` from one desynchronises hydration — which is why the reveal
  is 100% CSS.

## Verified from this machine, 2026-09-02

- Robinhood Chain RPC answers: `eth_chainId` → `0x1237` (4663), block height
  read live in the browser at ~52.6M, gas ~0.39 gwei.
- Full wallet path exercised against a stubbed EIP-1193 provider: connect →
  wrong network → switch → address chip, with EIP-55 casing preserved.
- `next build` and `eslint` both clean. Mobile 375px: no horizontal overflow,
  menu opens, FAQ discloses.
- RDAP: `hoodr.com`, `hoodr.fun`, `hoodr.trade` are **registered**;
  `hoodr.xyz`, `hoodr.app`, `hoodr.io`, `hoodr.finance` were free.

## Renaming

The name lives in three strings at the top of `src/lib/site-config.ts`
(`name`, `wordmark`, `ticker`) plus the `NEXT_PUBLIC_HOODR_*` env prefix.
Nothing else spells it out — a rename is those strings and the prefix, never a
grep through components.

## Running it

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill values in **only once confirmed**.
Nothing in the app treats an unset value as live.
