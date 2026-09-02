/**
 * The page's sections, in order, shared by the navbar and the footer.
 *
 * This lives in lib and not in NavLinks.tsx for a concrete reason: every
 * export of a `"use client"` module is a client *reference* when a server
 * component imports it, so importing this array from the navbar into the
 * server-rendered footer produced a proxy, and `navLinks.map is not a
 * function` at prerender time. Shared data crossing that boundary belongs in
 * a module with no directive at all.
 */
export const navLinks = [
  { id: "thesis", index: "01", label: "The trade" },
  { id: "mechanism", index: "02", label: "The route" },
  { id: "asset", index: "03", label: "The asset" },
  { id: "register", index: "04", label: "Register" },
  { id: "math", index: "05", label: "The math" },
  { id: "verify", index: "06", label: "Verify" },
  { id: "open", index: "07", label: "Undecided" },
  { id: "questions", index: "08", label: "Questions" },
] as const;
