"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1140px] flex-col items-start px-4 py-32 sm:px-6">
      <p className="label text-stamp">Error</p>
      <h1 className="display mt-4 text-[clamp(2.4rem,8vw,5rem)] leading-none">
        Something broke
      </h1>
      <p className="prose-sans mt-5 max-w-[52ch] text-[14px] leading-relaxed text-ink-dim">
        This page failed to render. Nothing was signed, sent or stored — this
        site holds no funds and writes nothing onchain.
      </p>
      {error.digest && (
        <p className="num mt-3 text-[11px] text-ink-faint">
          digest {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-[2px] border border-rule-2 px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-ink uppercase transition hover:border-green hover:text-green"
      >
        Try again
      </button>
    </div>
  );
}
