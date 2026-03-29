"use client";

import { motion, useReducedMotion } from "framer-motion";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      className="relative isolate min-h-screen overflow-x-clip"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(195,139,83,0.24),transparent_60%)] blur-3xl" />
        <div className="absolute -left-28 top-[24%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(91,107,130,0.24),transparent_62%)] blur-3xl" />
        <div className="absolute -right-24 top-[30%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(132,74,64,0.2),transparent_64%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%,transparent_72%,rgba(0,0,0,0.12))]" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-[1220px] flex-col px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10 md:justify-center md:px-8 md:py-12 xl:px-10 xl:py-16">
        {children}
      </div>
    </motion.main>
  );
}
