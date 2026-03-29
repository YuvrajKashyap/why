"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyData } from "@/data/whyData";

type TornPageProps = {
  idx: number;
  section: {
    title: string;
    items: readonly string[];
  };
  skipMotion: boolean;
};

function TornPage({ idx, section, skipMotion }: TornPageProps) {
  const rotation = idx === 0 ? -1.8 : 1.4;
  const hoverRotation = idx === 0 ? -0.4 : 0.3;
  const pinColor = idx === 0 ? "#c4543a" : "#3a6e8c";

  return (
    <motion.section
      animate={{ opacity: 1, rotate: rotation, scale: 1, y: 0 }}
      className="group relative"
      initial={
        skipMotion
          ? false
          : { opacity: 0, rotate: rotation * 2, scale: 0.95, y: -40 }
      }
      transition={{
        duration: 0.85,
        delay: 0.3 + idx * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        skipMotion
          ? undefined
          : { rotate: hoverRotation, y: -6, transition: { duration: 0.35 } }
      }
    >
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative h-5 w-5 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.3)]"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${pinColor}dd, ${pinColor}88)`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </div>
        <div className="absolute left-1/2 top-3 h-3 w-6 -translate-x-1/2 rounded-full bg-black/10 blur-[2px]" />
      </div>

      <div
        className="absolute -top-2 left-[20%] z-10 h-6 w-20 -rotate-3 sm:w-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,235,210,0.65), rgba(230,215,180,0.5))",
          borderRadius: "1px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      />

      <div
        className="relative overflow-hidden px-5 pb-7 pt-10 sm:px-8 sm:pb-10 sm:pt-12"
        style={{
          backgroundColor: "#f5ecd6",
          backgroundImage: `
            linear-gradient(180deg, rgba(255,252,240,0.6) 0%, transparent 15%),
            radial-gradient(ellipse at 80% 90%, rgba(200,180,140,0.15), transparent 50%)
          `,
          borderRadius: "3px 3px 0 0",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2), inset 0 0 60px rgba(180,160,120,0.05)",
          clipPath:
            idx === 0
              ? "polygon(0 0, 100% 0, 100% 97%, 98% 98%, 95% 97.5%, 90% 99%, 85% 97.8%, 80% 99.2%, 75% 98%, 70% 99.5%, 65% 97.5%, 60% 99%, 55% 98.2%, 50% 100%, 45% 98%, 40% 99.3%, 35% 97.8%, 30% 99.5%, 25% 98.2%, 20% 99%, 15% 97.5%, 10% 99.2%, 5% 98%, 2% 99%, 0 97.5%)"
              : "polygon(0 0, 100% 0, 100% 98%, 97% 99%, 93% 97.8%, 88% 99.5%, 83% 98%, 78% 99.2%, 73% 97.5%, 68% 99%, 63% 98.2%, 58% 99.5%, 53% 97.8%, 48% 100%, 43% 98.3%, 38% 99%, 33% 97.5%, 28% 99.2%, 23% 98%, 18% 99.5%, 13% 97.8%, 8% 99%, 3% 98.2%, 0 99%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'150\' height=\'150\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'1.2\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'150\' height=\'150\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="pointer-events-none absolute left-6 right-6 top-3 flex justify-between sm:left-8 sm:right-8">
          {Array.from({ length: 5 }).map((_, ringIndex) => (
            <div
              key={ringIndex}
              className="h-3 w-3 rounded-full border border-[#c5b89e]/30 bg-[#1c1812]/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
            />
          ))}
        </div>

        <h2
          className="mb-7 text-[1.35rem] font-bold leading-[1.15] sm:mb-9 sm:text-[1.55rem]"
          style={{
            color: idx === 0 ? "#6b3a1a" : "#3a4a5c",
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
        >
          {section.title}
        </h2>

        <ol className="flex flex-col gap-0">
          {section.items.map((item, itemIndex) => (
            <motion.li
              key={item}
              animate={{ opacity: 1, x: 0 }}
              className="group/item"
              initial={skipMotion ? false : { opacity: 0, x: idx === 0 ? -8 : 8 }}
              transition={{
                duration: 0.45,
                delay: 0.55 + idx * 0.15 + itemIndex * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="flex items-start gap-3 border-b py-3 sm:gap-4"
                style={{ borderColor: "rgba(160,140,110,0.15)" }}
              >
                <span
                  className="mt-1 shrink-0 text-[0.75rem] font-semibold"
                  style={{
                    color:
                      idx === 0
                        ? "rgba(196,84,58,0.45)"
                        : "rgba(58,110,140,0.45)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                  }}
                >
                  {itemIndex + 1}
                </span>
                <p
                  className="text-[0.88rem] leading-[1.7] text-[#3a2e20]/70 transition-colors duration-200 group-hover/item:text-[#3a2e20]/95 sm:text-[0.92rem]"
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
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

export function TornPinnedHero() {
  const reduceMotion = useReducedMotion();
  const skipMotion = !!reduceMotion;

  return (
    <main
      className="relative min-h-screen text-[#e8e4df] selection:bg-[#c4543a]/25"
      style={{
        backgroundColor: "#161210",
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(80,60,35,0.12), transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(40,30,20,0.2), transparent 40%),
          radial-gradient(ellipse at 80% 70%, rgba(40,30,20,0.15), transparent 40%)
        `,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.02 0.8\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'300\' height=\'300\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[radial-gradient(ellipse,rgba(240,210,150,0.08),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-center px-4 py-16 sm:px-8 md:py-20">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 flex flex-col items-center md:mb-16"
          initial={skipMotion ? false : { opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-center text-[clamp(3rem,7.5vw,5rem)] leading-[0.9] tracking-[0.04em] text-[#f0e6d4]"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 600,
            }}
          >
            Why
          </h1>
        </motion.header>

        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <TornPage idx={0} section={whyData.want} skipMotion={skipMotion} />
          <TornPage idx={1} section={whyData.staySame} skipMotion={skipMotion} />
        </div>
      </div>
    </main>
  );
}
