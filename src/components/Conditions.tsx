import { clsx } from "clsx";
import { Chip } from "./ui/Chip";
import { CardHead, Blank } from "./ui/Section";
import { conditions, hoodAsset, allConditionsMet } from "@/lib/payout";
import { explorer } from "@/lib/site-config";

/**
 * The honest centre of the site.
 *
 * The pitch — "a token that pays you in Robinhood stock" — depends entirely
 * on a tokenized HOOD share existing on this chain, transferring freely, and
 * being legal to distribute. None of that was verifiable when this was
 * built. So the page publishes the conditions as an unticked checklist
 * instead of asserting the premise, and each box ticks itself the day the
 * corresponding fact is put in the environment.
 */
export function Conditions() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="card overflow-hidden">
        <CardHead
          title="Conditions the payout asset must meet"
          aside={
            allConditionsMet ? (
              <Chip tone="live" dot>
                All met
              </Chip>
            ) : (
              <Chip tone="unissued" dot>
                {conditions.filter((c) => c.met).length} of {conditions.length}
              </Chip>
            )
          }
        />
        <ul className="divide-y divide-[color:var(--rule)]">
          {conditions.map((condition) => (
            <li key={condition.id} className="flex gap-4 p-5">
              <span
                aria-hidden
                className={clsx(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] border text-[11px]",
                  condition.met
                    ? "border-green bg-green-soft text-green"
                    : "border-rule-2 text-ink-faint",
                )}
              >
                {condition.met ? "✓" : ""}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] leading-snug">
                  {condition.title}
                  <span className="sr-only">
                    {condition.met ? " — met" : " — not met"}
                  </span>
                </p>
                <p className="prose-sans mt-2 text-[12.5px] leading-relaxed text-ink-dim">
                  {condition.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card h-fit overflow-hidden">
        <CardHead title="The asset" />
        <div className="p-5">
          <p className="display text-[40px] leading-none">{hoodAsset.symbol}</p>
          <p className="prose-sans mt-2 text-[13px] text-ink-dim">
            {hoodAsset.name}
          </p>
          <p className="mt-1 text-[10px] tracking-[0.16em] text-ink-faint uppercase">
            {hoodAsset.kind} · Robinhood Chain
          </p>

          <dl className="mt-6 space-y-4 border-t border-rule pt-5">
            <div>
              <dt className="label">Contract</dt>
              <dd className="mt-1.5 text-[12px] break-all">
                {hoodAsset.address ? (
                  <a
                    href={explorer.address(hoodAsset.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="num text-green underline underline-offset-4"
                  >
                    {hoodAsset.address}
                  </a>
                ) : (
                  <Blank width="11rem" />
                )}
              </dd>
            </div>
            <div>
              <dt className="label">Issuer</dt>
              <dd className="mt-1.5 text-[12px]">
                <Blank value={hoodAsset.issuer} width="11rem" />
              </dd>
            </div>
          </dl>

          <p className="prose-sans mt-6 border-t border-rule pt-5 text-[11.5px] leading-relaxed text-ink-faint">
            A tokenized share is a claim issued by whoever mints it. It is not
            the same instrument as a share held through a broker, it may carry
            no voting rights, and its value depends on that issuer honouring
            it. Read § 08 before deciding what this token is worth to you.
          </p>
        </div>
      </div>
    </div>
  );
}
