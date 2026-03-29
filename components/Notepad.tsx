"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReasonItem, type ReasonTone } from "@/components/ReasonItem";

type NotepadProps = {
  index: number;
  items: readonly string[];
  title: string;
  tone: ReasonTone;
};

const panelVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    rotate: index === 0 ? -2.5 : 2.5,
    scale: 0.98,
    y: 34,
  }),
  visible: (index: number) => ({
    opacity: 1,
    rotate: index === 0 ? -1.1 : 1.1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.82,
      delay: 0.16 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.24,
      staggerChildren: 0.07,
    },
  },
};

const toneStyles: Record<
  ReasonTone,
  {
    pin: string;
    tape: string;
  }
> = {
  ambition: {
    pin: "from-[#f4d4b0] to-[#b77639]",
    tape: "border-[#d5af8a]/50 bg-[linear-gradient(135deg,rgba(248,235,215,0.92),rgba(214,180,140,0.52))]",
  },
  warning: {
    pin: "from-[#ecc2b9] to-[#975349]",
    tape: "border-[#d3a89f]/52 bg-[linear-gradient(135deg,rgba(249,236,229,0.9),rgba(191,140,129,0.48))]",
  },
};

const spiralRings = Array.from({ length: 7 });

export function Notepad({ index, items, title, tone }: NotepadProps) {
  const reduceMotion = useReducedMotion();
  const palette = toneStyles[tone];
  const labelId = `notepad-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <motion.section
      aria-labelledby={labelId}
      className="group relative"
      custom={index}
      initial={reduceMotion ? false : "hidden"}
      transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
      variants={reduceMotion ? undefined : panelVariants}
      viewport={{ amount: 0.25, once: true }}
      whileHover={reduceMotion ? undefined : { rotate: index === 0 ? -0.55 : 0.55, y: -6 }}
      whileInView={reduceMotion ? undefined : "visible"}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 flex -translate-y-1/2 justify-between gap-2 sm:inset-x-10 sm:gap-3">
        {spiralRings.map((_, ringIndex) => (
          <span
            key={ringIndex}
            className="h-6 w-6 rounded-full border border-[#c5b39c]/45 bg-[#f1e4d1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_5px_rgba(40,28,18,0.12)]"
          />
        ))}
      </div>
      <div className="notepad-surface relative flex h-full overflow-hidden rounded-[2rem] border border-white/10 px-5 pb-6 pt-16 sm:px-7 sm:pb-8 sm:pt-[4.5rem] lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0)_72%)] opacity-70 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
        <div className="relative z-10 flex w-full flex-col">
          <div className="relative mb-8 flex justify-center px-4">
            <div
              className={`absolute top-2 h-[4.75rem] w-full max-w-[19rem] rounded-[1.1rem] border shadow-[0_10px_18px_rgba(0,0,0,0.06)] ${palette.tape}`}
            />
            <div
              className={`absolute top-0 h-4 w-4 rounded-full bg-gradient-to-b shadow-[0_10px_18px_rgba(0,0,0,0.18)] ${palette.pin}`}
            />
            <h2
              className="relative max-w-[17rem] px-5 text-center font-display text-[1.78rem] leading-[1.02] text-[#261c15] sm:text-[2rem]"
              id={labelId}
            >
              {title}
            </h2>
          </div>
          <motion.ol
            className="relative z-10 flex flex-col gap-1.5"
            variants={reduceMotion ? undefined : listVariants}
          >
            {items.map((item, itemIndex) => (
              <ReasonItem
                key={item}
                index={itemIndex}
                text={item}
                tone={tone}
              />
            ))}
          </motion.ol>
        </div>
      </div>
    </motion.section>
  );
}
