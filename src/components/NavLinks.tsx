"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { navLinks } from "@/lib/nav";

export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Highlights whichever section has most recently crossed a line at 45% of
  // the viewport.
  //
  // A plain IntersectionObserver hands you every changed entry at once and
  // "the first intersecting one" is arbitrary; collapsing its root to a band
  // at the line fixes the semantics but never fires, because a zero-height
  // root intersects nothing. A rAF-throttled scroll listener measures
  // correctly but requestAnimationFrame does not run while the page is not
  // being rendered — and neither does intersection delivery — so both freeze
  // in a background tab.
  //
  // So: a scroll listener throttled by a timer, measuring rects and
  // answering the actual question. ~12 updates a second at most, and it
  // keeps working wherever the page is. setActive only ever runs inside the
  // timer callback, never synchronously in the effect body, which the React
  // Compiler lint rules reject.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      timer = undefined;
      const line = window.innerHeight * 0.45;
      let current: string | null = null;
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top > line) break;
        current = link.id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (timer === undefined) timer = setTimeout(update, 80);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (timer !== undefined) clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <>
      <ul className="hidden flex-1 items-center gap-5 xl:flex">
        {navLinks.map((link) => {
          const isActive = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={clsx(
                  "group flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase transition",
                  isActive ? "text-ink" : "text-ink-dim hover:text-ink",
                )}
              >
                <span
                  className={clsx(
                    "transition",
                    isActive
                      ? "text-green"
                      : "text-ink-faint group-hover:text-green",
                  )}
                >
                  {link.index}
                </span>
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="nav-menu"
        className="ml-auto rounded-[2px] border border-rule px-3 py-2 text-[10px] tracking-[0.16em] text-ink-dim uppercase transition hover:border-rule-2 hover:text-ink xl:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          id="nav-menu"
          className="absolute inset-x-0 top-14 border-b border-rule bg-paper/95 backdrop-blur-md xl:hidden"
        >
          <ul className="mx-auto flex w-full max-w-[1140px] flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-rule py-3 text-[11px] tracking-[0.16em] text-ink-dim uppercase last:border-b-0"
                >
                  <span className="text-green">{link.index}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
