"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyData } from "@/data/whyData";
import Link from "next/link";

export default function Design1() {
  const reduceMotion = useReducedMotion();
  const skip = !!reduceMotion;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090b] text-[#e8e4df] selection:bg-[#c9935a]/30">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top ambient light */}
      <div className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse,rgba(180,140,80,0.06),transparent_70%)]" />

      {/* Back link */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 text-xs font-medium uppercase tracking-[0.2em] text-[#e8e4df]/30 transition-colors hover:text-[#e8e4df]/70"
      >
        Back
      </Link>

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-5 py-16 sm:px-8 md:py-20">
        {/* Title */}
        <motion.header
          className="mb-16 flex flex-col items-center md:mb-20"
          initial={skip ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 h-px w-12 bg-gradient-to-r from-transparent via-[#c49a5c]/50 to-transparent" />
          <h1
            className="text-center text-[clamp(2.8rem,7vw,5rem)] font-extralight leading-[0.9] tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
          >
            Why
          </h1>
          <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#c49a5c]/40 to-transparent" />
        </motion.header>

        {/* Two monolith panels */}
        <div className="grid w-full gap-6 lg:grid-cols-2 lg:gap-4 xl:gap-6">
          {[whyData.want, whyData.staySame].map((section, idx) => (
            <motion.section
              key={section.title}
              className="group relative"
              initial={skip ? false : { opacity: 0, y: 60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.3 + idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Panel */}
              <div
                className="relative overflow-hidden border border-white/[0.04] bg-[#0e1014]"
                style={{
                  borderRadius: "2px",
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background:
                      idx === 0
                        ? "linear-gradient(90deg, transparent, #c49a5c, transparent)"
                        : "linear-gradient(90deg, transparent, #8b6b5a, transparent)",
                  }}
                />

                {/* Inner glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      idx === 0
                        ? "radial-gradient(ellipse at top, rgba(196,154,92,0.04), transparent 60%)"
                        : "radial-gradient(ellipse at top, rgba(139,107,90,0.04), transparent 60%)",
                  }}
                />

                <div className="px-7 pb-10 pt-10 sm:px-10 sm:pb-14 sm:pt-12 lg:px-12">
                  {/* Section title */}
                  <h2
                    className="mb-10 text-[0.65rem] font-semibold uppercase tracking-[0.3em] sm:mb-12"
                    style={{
                      color: idx === 0 ? "#c49a5c" : "#a07b6a",
                    }}
                  >
                    {section.title}
                  </h2>

                  {/* Items */}
                  <ol className="flex flex-col gap-0">
                    {section.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="group/item relative border-b border-white/[0.03] py-5 first:pt-0 last:border-0 last:pb-0"
                        initial={skip ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.6 + idx * 0.15 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div className="flex items-start gap-5">
                          <span
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[0.6rem] font-bold tracking-[0.1em]"
                            style={{
                              color:
                                idx === 0
                                  ? "rgba(196,154,92,0.4)"
                                  : "rgba(160,123,106,0.4)",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-[0.88rem] font-light leading-[1.7] text-[#e8e4df]/75 transition-colors duration-300 group-hover/item:text-[#e8e4df]/95 sm:text-[0.92rem]">
                            {item}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Bottom accent */}
                <div
                  className="h-px w-full opacity-30"
                  style={{
                    background:
                      idx === 0
                        ? "linear-gradient(90deg, transparent, #c49a5c, transparent)"
                        : "linear-gradient(90deg, transparent, #8b6b5a, transparent)",
                  }}
                />
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer mark */}
        <motion.div
          className="mt-16 flex flex-col items-center md:mt-20"
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="h-8 w-px bg-gradient-to-b from-[#c49a5c]/30 to-transparent" />
        </motion.div>
      </div>
    </main>
  );
}
