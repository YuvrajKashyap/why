"use client";

import { motion, useReducedMotion } from "framer-motion";

export function WhyHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      className="mx-auto flex max-w-xl flex-col items-center text-center"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mb-5 h-px w-16 bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <h1 className="font-display text-[clamp(3.4rem,8vw,5.7rem)] leading-[0.88] tracking-[0.04em] text-[#f6efe7] drop-shadow-[0_12px_36px_rgba(0,0,0,0.34)]">
        Why
      </h1>
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#cb905b]/75 to-transparent" />
    </motion.header>
  );
}
