"use client";

import { motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Heroheading({ hero }) {
  const reduce = useReducedMotion();

  const titleWords = (hero?.title ?? "").split(" ").filter(Boolean);
  const highlightWords = (hero?.highlight ?? "").split(" ").filter(Boolean);

  return (
    <motion.h1
      variants={container}
      initial={reduce ? false : "hidden"}
      animate="show"
      className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.5rem]"
    >
      {titleWords.map((w, i) => (
        <span key={`t-${i}`}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>{" "}
        </span>
      ))}

      {highlightWords.map((w, i) => (
        <span key={`h-${i}`}>
          <motion.span
            variants={word}
            className="inline-block pb-[0.2em] -mb-[0.2em] bg-linear-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%" }}
            animate={
              reduce
                ? undefined
                : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            {w}
          </motion.span>
          {i < highlightWords.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.h1>
  );
}