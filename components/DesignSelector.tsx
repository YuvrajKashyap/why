"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const designs = [
  { id: 1, label: "Monolith" },
  { id: 2, label: "Manuscript" },
  { id: 3, label: "Neon Etch" },
  { id: 4, label: "Torn & Pinned" },
  { id: 5, label: "Cathedral" },
];

export function DesignSelector() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="Design variants"
      className="mt-16 flex flex-col items-center gap-4 lg:mt-20"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-[var(--muted)]/40">
        Alternate designs
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {designs.map((d) => (
          <Link
            key={d.id}
            href={`/designs/${d.id}`}
            className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.05em] text-[var(--muted)]/60 transition-all duration-300 hover:border-[#c49a5c]/20 hover:bg-[#c49a5c]/[0.06] hover:text-[var(--foreground)]/80"
          >
            {d.id}. {d.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
