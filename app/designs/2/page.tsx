"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyData } from "@/data/whyData";
import Link from "next/link";

export default function Design2() {
  const reduceMotion = useReducedMotion();
  const skip = !!reduceMotion;

  return (
    <main className="relative min-h-screen bg-[#1a1510] text-[#2c1e12] selection:bg-[#b5784a]/30 selection:text-[#1a0f08]">
      {/* Warm ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[radial-gradient(ellipse,rgba(200,160,100,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,22,14,0.3),transparent_40%,transparent_60%,rgba(10,8,5,0.5))]" />
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 text-xs font-medium tracking-[0.15em] text-[#d4c4aa]/40 transition-colors hover:text-[#d4c4aa]/80"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        BACK
      </Link>

      <div className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-center px-4 py-16 sm:px-8 md:py-20">
        {/* Title */}
        <motion.header
          className="mb-14 flex flex-col items-center md:mb-18"
          initial={skip ? false : { opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-center text-[clamp(3rem,8vw,5.5rem)] leading-[0.85] tracking-[0.02em] text-[#e8dcc8]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}
          >
            Why
          </h1>
          <div className="mt-3 h-[1.5px] w-16 bg-[#c49a5c]/40" />
        </motion.header>

        {/* Two manuscript pages */}
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-6 xl:gap-8">
          {[whyData.want, whyData.staySame].map((section, idx) => (
            <motion.section
              key={section.title}
              className="group relative"
              initial={
                skip
                  ? false
                  : {
                      opacity: 0,
                      y: 40,
                      rotate: idx === 0 ? -1.5 : 1.5,
                    }
              }
              animate={{ opacity: 1, y: 0, rotate: idx === 0 ? -0.6 : 0.6 }}
              transition={{
                duration: 1,
                delay: 0.25 + idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={skip ? undefined : { rotate: 0, y: -4, transition: { duration: 0.4 } }}
            >
              {/* Paper surface */}
              <div
                className="relative overflow-hidden rounded-sm px-6 pb-8 pt-10 sm:px-10 sm:pb-12 sm:pt-14"
                style={{
                  backgroundColor: "#f0e4cc",
                  backgroundImage: `
                    radial-gradient(ellipse at 30% 0%, rgba(255,250,235,0.8), transparent 50%),
                    radial-gradient(ellipse at 70% 100%, rgba(190,165,120,0.15), transparent 50%)
                  `,
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 8px rgba(160,130,80,0.08)",
                }}
              >
                {/* Paper grain overlay */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.04]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Red margin line */}
                <div
                  className="pointer-events-none absolute bottom-0 top-0"
                  style={{
                    left: "3.2rem",
                    width: "1.5px",
                    background: "rgba(190,70,60,0.18)",
                  }}
                />
                <div
                  className="pointer-events-none absolute bottom-0 top-0 hidden sm:block"
                  style={{
                    left: "4.8rem",
                    width: "1.5px",
                    background: "rgba(190,70,60,0.12)",
                  }}
                />

                {/* Horizontal ruled lines */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent, transparent 2.4rem, rgba(100,80,55,0.1) 2.4rem, rgba(100,80,55,0.1) calc(2.4rem + 1px))",
                    backgroundPosition: "0 2.8rem",
                  }}
                />

                {/* Dog-ear fold */}
                <div
                  className="absolute right-0 top-0 h-10 w-10"
                  style={{
                    background: "linear-gradient(225deg, #1a1510 0%, #1a1510 48%, #ddd0b8 49%, #e8dbc4 100%)",
                    boxShadow: "inset 1px -1px 3px rgba(0,0,0,0.08)",
                  }}
                />

                {/* Section title */}
                <h2
                  className="relative z-10 mb-8 pl-8 text-[1.6rem] leading-[1.1] sm:mb-10 sm:pl-10 sm:text-[1.85rem]"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontWeight: 700,
                    color: idx === 0 ? "#5c3a1a" : "#5a2e24",
                  }}
                >
                  {section.title}
                </h2>

                {/* Items */}
                <ol className="relative z-10 flex flex-col gap-1">
                  {section.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="group/item pl-8 sm:pl-10"
                      initial={skip ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + idx * 0.12 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="flex items-start gap-3 py-[0.55rem]">
                        <span
                          className="mt-1 shrink-0 text-[0.75rem] font-bold italic"
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            color:
                              idx === 0
                                ? "rgba(156,110,50,0.5)"
                                : "rgba(140,70,55,0.5)",
                          }}
                        >
                          {i + 1}.
                        </span>
                        <p
                          className="text-[0.9rem] leading-[1.75] transition-colors duration-300 group-hover/item:text-[#1a0f08] sm:text-[0.95rem]"
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontWeight: 500,
                            color: "rgba(44,30,18,0.78)",
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
          ))}
        </div>

        {/* Footer ornament */}
        <motion.div
          className="mt-14 flex items-center gap-3 md:mt-18"
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="h-px w-6 bg-[#c49a5c]/25" />
          <div className="h-1.5 w-1.5 rotate-45 border border-[#c49a5c]/25" />
          <div className="h-px w-6 bg-[#c49a5c]/25" />
        </motion.div>
      </div>
    </main>
  );
}
