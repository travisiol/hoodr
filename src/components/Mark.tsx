/**
 * The mark is an engraver's seal, not a coin logo: a ruled ring, and inside
 * it the mechanism — a bar of fees on the left, an arrow, a share on the
 * right. It is not a price chart, because this project does not draw prices
 * it cannot source.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="16"
        cy="16"
        r="12.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      {/* fee in */}
      <rect x="8" y="11" width="2.4" height="10" fill="currentColor" />
      {/* route */}
      <path
        d="M12 16 H20"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M18.6 13.9 L21.4 16 L18.6 18.1 Z"
        fill="currentColor"
      />
      {/* the share out */}
      <rect
        x="22"
        y="12.2"
        width="2.4"
        height="7.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * The dry seal pressed into the certificate. The ring text is real text on a
 * path, so it is selectable and readable by a screen reader rather than
 * being decorative outlines.
 */
export function Seal({
  className,
  legend = "ROBINHOOD CHAIN · 4663 · BEARER INSTRUMENT · ",
}: {
  className?: string;
  legend?: string;
}) {
  return (
    <svg viewBox="0 0 160 160" className={className} focusable="false">
      <defs>
        <path
          id="seal-ring"
          d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
          fill="none"
        />
      </defs>

      <g fill="none" stroke="currentColor">
        <circle cx="80" cy="80" r="76" strokeWidth="1.4" />
        <circle cx="80" cy="80" r="72" strokeWidth="0.5" opacity="0.7" />
        <circle cx="80" cy="80" r="45" strokeWidth="0.5" opacity="0.7" />
        <circle cx="80" cy="80" r="42" strokeWidth="1" />
      </g>

      <text
        fontSize="8.4"
        letterSpacing="3.2"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
      >
        <textPath href="#seal-ring" startOffset="0">
          {legend.repeat(2)}
        </textPath>
      </text>

      {/* The mechanism again, at seal scale: drawn inline rather than by
          nesting <Mark/>, since a nested <svg> would carry its own viewBox
          and land in the wrong place. */}
      <g transform="translate(56 56) scale(1.5)">
        <rect x="8" y="11" width="2.4" height="10" fill="currentColor" />
        <path d="M12 16 H20" stroke="currentColor" strokeWidth="1.2" />
        <path d="M18.6 13.9 L21.4 16 L18.6 18.1 Z" fill="currentColor" />
        <rect
          x="22"
          y="12.2"
          width="2.4"
          height="7.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
