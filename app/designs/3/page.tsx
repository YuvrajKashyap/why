"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyData } from "@/data/whyData";
import Link from "next/link";

function GlowPanel({
  section,
  idx,
  skip,
}: {
  section: { title: string; items: readonly string[] };
  idx: number;
  skip: boolean;
}) {
  const hue = idx === 0 ? "amber" : "steel";
  const borderColor =
    hue === "amber" ? "rgba(210,170,100,0.15)" : "rgba(160,175,200,0.15)";
  const glowColor =
    hue === "amber" ? "rgba(210,170,100,0.06)" : "rgba(140,165,200,0.06)";
  const accentColor = hue === "amber" ? "#d4aa64" : "#9aabbf";
  const accentDim =
    hue === "amber" ? "rgba(210,170,100,0.3)" : "rgba(154,171,191,0.3)";

  return (
    <motion.section
      className="group relative"
      initial={skip ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.35 + idx * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="relative overflow-hidden p-[1px]"
        style={{
          background: `linear-gradient(180deg, ${borderColor}, transparent 50%, ${borderColor})`,
        }}
      >
        {/* Corner brackets */}
        <div className="absolute left-0 top-0 h-5 w-5 border-l border-t" style={{ borderColor: accentDim }} />
        <div className="absolute right-0 top-0 h-5 w-5 border-r border-t" style={{ borderColor: accentDim }} />
        <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l" style={{ borderColor: accentDim }} />
        <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r" style={{ borderColor: accentDim }} />

        <div
          className="relative bg-[#0a0c10] px-6 pb-8 pt-8 transition-all duration-500 sm:px-9 sm:pb-12 sm:pt-10"
          style={{
            boxShadow: `inset 0 0 80px ${glowColor}`,
          }}
        >
          {/* Scanline effect */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
            }}
          />

          {/* Top label bar */}
          <div className="mb-8 flex items-center gap-3 sm:mb-10">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentDim}` }}
            />
            <h2
              className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]"
              style={{
                fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
                color: accentColor,
              }}
            >
              {section.title}
            </h2>
          </div>

          {/* Items */}
          <ol className="flex flex-col gap-0">
            {section.items.map((item, i) => (
              <motion.li
                key={i}
                className="group/line relative"
                initial={skip ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + idx * 0.2 + i * 0.07,
                }}
              >
                <div className="flex gap-4 border-b border-white/[0.03] py-4 first:pt-0 sm:gap-5">
                  {/* Line number */}
                  <span
                    className="mt-0.5 shrink-0 text-[0.65rem] tabular-nums"
                    style={{
                      fontFamily:
                        "ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
                      color: accentDim,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Text */}
                  <p
                    className="text-[0.85rem] leading-[1.75] text-[#c8c4be]/60 transition-colors duration-300 group-hover/line:text-[#c8c4be]/90 sm:text-[0.88rem]"
                    style={{
                      fontFamily:
                        "ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
                    }}
                  >
                    {item}
                  </p>
                </div>

                {/* Hover glow bar */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] opacity-0 transition-opacity duration-300 group-hover/line:opacity-100"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 12px ${accentDim}`,
                  }}
                />
              </motion.li>
            ))}
          </ol>

          {/* Bottom status bar */}
          <div className="mt-6 flex items-center justify-between text-[0.55rem] uppercase tracking-[0.2em] sm:mt-8">
            <span style={{ color: accentDim, fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace" }}>
              {section.items.length} entries
            </span>
            <span style={{ color: accentDim, fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace" }}>
              active
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Design3() {
  const reduceMotion = useReducedMotion();
  const skip = !!reduceMotion;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060810] text-[#c8c4be] selection:bg-[#d4aa64]/20">
      {/* Deep void background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(100,120,160,0.03),transparent_60%)]" />
      </div>

      {/* Fine dot grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Back link */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 text-[0.6rem] uppercase tracking-[0.3em] text-white/20 transition-colors hover:text-white/50"
        style={{ fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace" }}
      >
        [back]
      </Link>

      <div className="relative mx-auto flex min-h-screen max-w-[1320px] flex-col items-center justify-center px-4 py-16 sm:px-8 md:py-20">
        {/* Title */}
        <motion.header
          className="mb-14 flex flex-col items-center md:mb-18"
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1
            className="text-center text-[clamp(2.4rem,6vw,4rem)] font-extralight leading-[1] tracking-[0.4em] uppercase text-[#e0dcd6]"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Why
          </h1>
          <motion.div
            className="mt-4 h-px bg-gradient-to-r from-transparent via-[#d4aa64]/30 to-transparent"
            initial={skip ? false : { width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.header>

        {/* Panels */}
        <div className="grid w-full gap-6 lg:grid-cols-2 lg:gap-4">
          <GlowPanel section={whyData.want} idx={0} skip={skip} />
          <GlowPanel section={whyData.staySame} idx={1} skip={skip} />
        </div>
      </div>
    </main>
  );
}
