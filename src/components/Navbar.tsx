import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { WalletConnect } from "./WalletConnect";
import { Mark } from "./Mark";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <nav className="relative mx-auto flex h-14 w-full max-w-[1140px] items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <Mark className="h-5 w-5 text-green" />
          <span className="display text-[19px] leading-none">
            {siteConfig.name}
          </span>
          <span className="hidden text-[10px] tracking-[0.16em] text-ink-faint sm:inline">
            {siteConfig.ticker}
          </span>
        </Link>

        <NavLinks />

        <WalletConnect />
      </nav>
    </header>
  );
}
