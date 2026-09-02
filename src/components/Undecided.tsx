import { CardHead } from "./ui/Section";

/**
 * The open decisions, published rather than hidden. Each of these changes
 * what a holder receives, and each is genuinely unsettled — so the site
 * lists them where a launch page would normally put a roadmap.
 *
 * When one is settled, it moves out of this list into the place on the page
 * that actually uses it (an env var, § 03, § 06), not into a "shipped"
 * column.
 */
const items = [
  {
    n: "01",
    title: "How large is the fee",
    body: "A fee big enough to be worth holding for is also big enough to strangle the volume that produces it. Nothing is chosen. The number goes in one env var and appears in § 02 and the certificate the day it does.",
  },
  {
    n: "02",
    title: "How often it runs",
    body: "Distribution has a gas cost that is paid whether it moves $8 or $8,000. Continuous, hourly and daily all have a case; batching by threshold instead of by clock is a fourth.",
  },
  {
    n: "03",
    title: "Pushed or claimed",
    body: "Pushing to every holder is the better experience and scales badly. Claiming scales and quietly keeps whatever nobody claims. The second one needs a rule for the remainder before it can be honest.",
  },
  {
    n: "04",
    title: "Which tokenized HOOD",
    body: "If more than one issuer mints a HOOD-backed token on this chain, the choice is a counterparty choice, not a ticker choice. It gets made in public, with the issuer named in § 03.",
  },
  {
    n: "05",
    title: "Below-dust holders",
    body: "A wallet whose pro-rata share rounds to a fraction of a cent cannot receive a transfer worth its gas. Whether that accrues, is swept, or is dropped is undecided and is exactly the kind of detail that quietly becomes a fee.",
  },
  {
    n: "06",
    title: "The compliance read",
    body: "Routing fees into a tokenized equity and distributing it to holders distributes securities exposure. This is answered by counsel before launch, and the answer may change the mechanism or end the project.",
  },
];

export function Undecided() {
  return (
    <div className="card overflow-hidden">
      <CardHead title="Open decisions" aside={<span>{items.length}</span>} />
      <ol className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.n} className="bg-paper-2 p-5">
            <p className="num text-[11px] text-stamp">{item.n}</p>
            <p className="mt-2 text-[13px] leading-snug">{item.title}</p>
            <p className="prose-sans mt-2.5 text-[12.5px] leading-relaxed text-ink-dim">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
