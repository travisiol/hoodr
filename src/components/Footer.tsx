import { Seal } from "./Mark";
import { navLinks } from "@/lib/nav";
import { siteConfig, launchConfig } from "@/lib/site-config";
import { ROBINHOOD_CHAIN_ID } from "@/lib/chain";

/**
 * The affiliation notice is printed in full here, at reading size, rather
 * than shrunk into a grey line nobody can read. A disclaimer set in 9px is a
 * disclaimer written to be missed.
 */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-rule">
      <div className="mx-auto flex w-full max-w-[1140px] flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule px-4 py-3 text-[10px] tracking-[0.16em] text-ink-faint uppercase sm:px-6">
        <span className="text-stamp">Pre-launch</span>
        <span>No contract</span>
        <span>No distribution</span>
        <span>Chain {ROBINHOOD_CHAIN_ID}</span>
        <span className="ml-auto">
          {launchConfig.isLive ? "Live" : "Nothing deployed"}
        </span>
      </div>

      <div className="mx-auto grid w-full max-w-[1140px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p className="display text-[26px] leading-none">
            {siteConfig.name}
            <span className="ml-3 text-[11px] tracking-[0.16em] text-ink-faint">
              {siteConfig.ticker}
            </span>
          </p>

          <p className="prose-sans mt-5 max-w-[68ch] text-[12.5px] leading-relaxed text-ink-dim">
            {siteConfig.affiliationNotice}
          </p>

          <p className="prose-sans mt-4 max-w-[68ch] text-[12.5px] leading-relaxed text-ink-faint">
            Nothing on this page is investment advice, an offer, or a promise
            of a return. A tokenized share is a claim on its issuer, not a
            share held through a broker. No token exists yet; if you are sent
            a contract address claiming to be this one, it is not.
          </p>

          <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-[0.16em] text-ink-dim uppercase">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="transition hover:text-green"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.x}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-green"
            >
              X ↗
            </a>
          </nav>
        </div>

        <div className="flex items-start justify-start lg:justify-end">
          <Seal className="h-32 w-32 text-ink-faint" />
        </div>
      </div>
    </footer>
  );
}
