import { clsx } from "clsx";

type Tone = "unissued" | "live" | "muted";

const tones: Record<Tone, string> = {
  // The stamp colour is used a great deal on purpose: pre-launch, almost
  // everything on this site is unissued.
  unissued: "border-stamp/40 bg-stamp-soft text-stamp",
  live: "border-green/35 bg-green-soft text-green",
  muted: "border-rule-2 bg-paper-3/50 text-ink-faint",
};

export function Chip({
  children,
  tone = "muted",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1 text-[10px] font-medium tracking-[0.16em] whitespace-nowrap uppercase",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={clsx(
            "h-1 w-1 rounded-full",
            tone === "live" && "bg-green",
            tone === "unissued" && "animate-blink bg-stamp",
            tone === "muted" && "bg-ink-faint",
          )}
        />
      )}
      {children}
    </span>
  );
}
