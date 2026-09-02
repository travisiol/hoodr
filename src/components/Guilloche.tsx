/**
 * The guilloche rosette engraved on banknotes and share certificates, drawn
 * here as a real hypotrochoid rather than a background image: every point is
 * computed from the formula below, so it scales, prints, and weighs nothing.
 *
 * Deterministic on purpose — no randomness anywhere — because the server and
 * the client must produce byte-identical path data or hydration breaks.
 */
function hypotrochoid(
  R: number,
  r: number,
  d: number,
  turns: number,
  steps: number,
) {
  const points: string[] = [];
  const k = (R - r) / r;

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const x = (R - r) * Math.cos(t) + d * Math.cos(k * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(k * t);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return `M${points.join("L")}`;
}

export function Guilloche({
  className,
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      aria-hidden
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
      >
        <path d={hypotrochoid(90, 31, 46, 31, 1600)} />
        <path d={hypotrochoid(78, 23, 40, 23, 1300)} opacity={0.75} />
        <path d={hypotrochoid(60, 17, 30, 17, 1000)} opacity={0.55} />
        <circle cx="0" cy="0" r="95" />
        <circle cx="0" cy="0" r="92.5" strokeWidth="0.2" />
      </g>
    </svg>
  );
}

/**
 * The horizontal engraved band: the same construction unrolled, used as a
 * rule between the certificate's fields.
 */
export function GuillocheBand({ className }: { className?: string }) {
  const width = 1200;
  const steps = 900;
  const amp = 9;

  const wave = (phase: number, freq: number) => {
    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const y =
        12 +
        Math.sin((i / steps) * Math.PI * 2 * freq + phase) * amp * 0.6 +
        Math.sin((i / steps) * Math.PI * 2 * freq * 2.5 + phase * 1.7) *
          amp *
          0.4;
      points.push(`${x.toFixed(1)},${y.toFixed(2)}`);
    }
    return `M${points.join("L")}`;
  };

  return (
    <svg
      viewBox={`0 0 ${width} 24`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.55">
        <path d={wave(0, 26)} />
        <path d={wave(Math.PI / 2, 26)} opacity="0.7" />
        <path d={wave(Math.PI, 26)} opacity="0.5" />
      </g>
    </svg>
  );
}
