import { clsx } from "clsx";

/**
 * Section chrome in the document register: an article number, a serif
 * heading, and an engraved rule running to the edge of the column. The page
 * is numbered end to end so a reader can say where they are without a
 * scrollbar — and because a certificate is a document, not a feed.
 */
export function SectionHead({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4">
        <span className="label text-green">§ {index}</span>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        {aside}
      </div>
      <h2 className="display mt-3 text-[clamp(1.6rem,3.6vw,2.5rem)] leading-[1.05]">
        {title}
      </h2>
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "mx-auto w-full max-w-[1140px] scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function CardHead({
  title,
  aside,
}: {
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="card-head">
      <span>{title}</span>
      {aside}
    </div>
  );
}

/**
 * A ruled blank where a value will go. Renders the value once there is one,
 * and an em dash on a rule until then — the certificate convention for a
 * field nobody has filled in, and unmistakably not a number.
 */
export function Blank({
  value,
  width = "5rem",
  className,
}: {
  value?: string | null;
  width?: string;
  className?: string;
}) {
  if (value) {
    return <span className={clsx("num", className)}>{value}</span>;
  }
  return (
    <span
      className={clsx("blank num text-center", className)}
      style={{ minWidth: width }}
      title="Not issued yet"
    >
      —
    </span>
  );
}
