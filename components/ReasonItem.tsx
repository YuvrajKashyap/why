"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export type ReasonTone = "ambition" | "warning";

type ReasonItemProps = {
  index: number;
  text: string;
  tone: ReasonTone;
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const toneStyles: Record<
  ReasonTone,
  {
    badge: string;
    glow: string;
    hover: string;
  }
> = {
  ambition: {
    badge:
      "border-[#c1915d]/30 bg-[#c8935b]/14 text-[#7d4d24] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_24px_rgba(156,100,52,0.10)]",
    glow: "bg-[#b77639]/60",
    hover: "hover:bg-white/38",
  },
  warning: {
    badge:
      "border-[#a96d62]/28 bg-[#a15f53]/12 text-[#61342c] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_24px_rgba(122,65,54,0.10)]",
    glow: "bg-[#9b5448]/55",
    hover: "hover:bg-[#fff8f4]/44",
  },
};

export function ReasonItem({ index, text, tone }: ReasonItemProps) {
  const reduceMotion = useReducedMotion();
  const palette = toneStyles[tone];

  return (
    <motion.li className="list-none" variants={reduceMotion ? undefined : itemVariants}>
      <motion.div
        className={`group relative rounded-[1.35rem] px-4 py-3.5 transition-colors duration-300 ${palette.hover}`}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { x: 2, y: -3 }}
      >
        <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-[rgba(35,26,18,0.1)]" />
        <div
          className={`pointer-events-none absolute bottom-4 left-2 top-4 w-[0.18rem] rounded-full opacity-0 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100 ${palette.glow}`}
        />
        <div className="flex items-start gap-4 sm:gap-5">
          <span
            className={`mt-0.5 inline-flex h-10 min-w-10 items-center justify-center rounded-[1rem] border text-sm font-semibold tracking-[0.08em] ${palette.badge}`}
          >
            {index + 1}
          </span>
          <p className="max-w-[44ch] pt-0.5 text-[0.99rem] leading-7 text-[var(--paper-ink)] sm:text-[1.05rem]">
            {text}
          </p>
        </div>
      </motion.div>
    </motion.li>
  );
}
