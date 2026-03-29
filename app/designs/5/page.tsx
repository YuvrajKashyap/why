"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyData } from "@/data/whyData";
import Link from "next/link";

function OrnamentDivider({ delay, skip }: { delay: number; skip: boolean }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 py-2"
      initial={skip ? false : { opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#8a7a60]/30 sm:w-16" />
      <svg width="18" height="18" viewBox="0 0 18 18" className="text-[#8a7a60]/30">
        <path
          d="M9 0L10.5 7.5L18 9L10.5 10.5L9 18L7.5 10.5L0 9L7.5 7.5Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#8a7a60]/30 sm:w-16" />
    </motion.div>
  );
}

function ScrollSection({
  section,
  idx,
  skip,
  baseDelay,
}: {
  section: { title: string; items: readonly string[] };
  idx: number;
  skip: boolean;
  baseDelay: number;
}) {
  const accentColor = idx === 0 ? "#c9935a" : "#9a7068";

  return (
    <motion.section
      className="relative"
      initial={skip ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: baseDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Section heading */}
      <div className="mb-10 flex flex-col items-center sm:mb-14">
        <motion.div
          className="mb-6 text-[0.55rem] font-semibold uppercase tracking-[0.5em]"
          style={{ color: `${accentColor}80` }}
          initial={skip ? false : { opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1, delay: baseDelay + 0.15 }}
        >
          {idx === 0 ? "Part I" : "Part II"}
        </motion.div>
        <h2
          className="text-center text-[1.7rem] leading-[1.05] sm:text-[2.2rem] md:text-[2.5rem]"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 600,
            color: "#ece4d6",
          }}
        >
          {section.title}
        </h2>
        <div
          className="mt-4 h-[1px] w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
          }}
        />
      </div>

      {/* Parchment panel */}
      <div
        className="relative mx-auto max-w-[640px] overflow-hidden px-6 pb-8 pt-8 sm:px-10 sm:pb-12 sm:pt-10"
        style={{
          background: "linear-gradient(180deg, rgba(30,26,20,0.7), rgba(22,19,14,0.9))",
          border: "1px solid rgba(138,122,96,0.1)",
          borderRadius: "2px",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03), inset 0 0 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Inner edge glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, ${accentColor}08, transparent 20%),
              linear-gradient(0deg, rgba(0,0,0,0.3), transparent 15%)
            `,
          }}
        />

        {/* Vertical accent line left */}
        <div
          className="pointer-events-none absolute bottom-8 left-4 top-8 w-px sm:left-6"
          style={{ background: `linear-gradient(180deg, transparent, ${accentColor}15, transparent)` }}
        />

        <ol className="relative flex flex-col gap-0">
          {section.items.map((item, i) => (
            <motion.li
              key={i}
              className="group/item"
              initial={skip ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: baseDelay + 0.3 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="flex items-start gap-5 border-b py-5 transition-colors duration-300 group-hover/item:bg-white/[0.01] sm:gap-6"
                style={{ borderColor: "rgba(138,122,96,0.06)" }}
              >
                {/* Ornamental number */}
                <span
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center text-[0.7rem]"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: `${accentColor}40`,
                  }}
                >
                  {toRoman(i + 1)}
                </span>

                <p
                  className="text-[0.92rem] leading-[1.75] text-[#d4cec2]/60 transition-colors duration-300 group-hover/item:text-[#d4cec2]/85 sm:text-[0.96rem]"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}

function toRoman(num: number): string {
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let result = "";
  let remaining = num;
  for (const [value, numeral] of map) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

export default function Design5() {
  const reduceMotion = useReducedMotion();
  const skip = !!reduceMotion;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b08] text-[#d4cec2] selection:bg-[#c9935a]/25">
      {/* Cathedral vignette */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(160,130,80,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
        {/* Vertical light beam */}
        <div className="absolute left-1/2 top-0 h-full w-[500px] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(180,150,100,0.015),transparent)]" />
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 text-[0.6rem] uppercase tracking-[0.25em] text-[#8a7a60]/40 transition-colors hover:text-[#8a7a60]/80"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}
      >
        Return
      </Link>

      <div className="relative mx-auto flex min-h-screen max-w-[800px] flex-col items-center px-5 py-20 sm:px-8 md:py-28">
        {/* Grand title */}
        <motion.header
          className="mb-16 flex flex-col items-center md:mb-24"
          initial={skip ? false : { opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 text-[0.5rem] font-semibold uppercase tracking-[0.6em] text-[#8a7a60]/30">
            A Manifesto
          </div>
          <h1
            className="text-center text-[clamp(3.5rem,9vw,6.5rem)] leading-[0.8] tracking-[0.06em] text-[#ece4d6]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 700 }}
          >
            Why
          </h1>
          <motion.div
            className="mt-6 flex items-center gap-2"
            initial={skip ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="h-px w-8 bg-[#8a7a60]/20" />
            <div className="h-1 w-1 rounded-full bg-[#c9935a]/30" />
            <div className="h-px w-8 bg-[#8a7a60]/20" />
          </motion.div>
        </motion.header>

        {/* Part I */}
        <ScrollSection section={whyData.want} idx={0} skip={skip} baseDelay={0.4} />

        {/* Grand divider */}
        <div className="my-16 md:my-24">
          <OrnamentDivider delay={1.2} skip={skip} />
        </div>

        {/* Part II */}
        <ScrollSection section={whyData.staySame} idx={1} skip={skip} baseDelay={1.0} />

        {/* Closing ornament */}
        <motion.footer
          className="mt-20 flex flex-col items-center md:mt-28"
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="mb-3 text-[0.5rem] uppercase tracking-[0.5em] text-[#8a7a60]/20">
            Finis
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#8a7a60]/15">
            <path
              d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z"
              fill="currentColor"
            />
          </svg>
        </motion.footer>
      </div>
    </main>
  );
}
