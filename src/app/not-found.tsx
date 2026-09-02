import Link from "next/link";

/**
 * Ship one of these on every project: Next's default 404 is unstyled, and on
 * a page with its own ground and type scale it reads as a broken deploy
 * rather than a wrong URL.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1140px] flex-col items-start px-4 py-32 sm:px-6">
      <p className="label text-stamp">404</p>
      <h1 className="display mt-4 text-[clamp(2.4rem,8vw,5rem)] leading-none">
        No such page
      </h1>
      <p className="prose-sans mt-5 max-w-[52ch] text-[14px] leading-relaxed text-ink-dim">
        That route does not exist on this site.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-[2px] border border-rule-2 px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-ink uppercase transition hover:border-green hover:text-green"
      >
        <span aria-hidden>←</span> Back to the certificate
      </Link>
    </div>
  );
}
