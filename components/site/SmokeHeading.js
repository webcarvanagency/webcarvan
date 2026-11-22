"use client";

import { useEffect, useRef, useState } from "react";
import './smokeheading.css';

// Deterministic "random" so server and client render identical values
const rand = (i, seed) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export default function SmokeHeading({
  title = "",
  as: Tag = "h2",
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let n = 0;
  const words = title.split(" ").filter(Boolean);

  return (
    <Tag
      ref={ref}
      aria-label={title}
      data-visible={visible}
      className={`smoke-heading mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl ${className}`}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true">
          <span className="smoke-word">
            {[...word].map((ch, ci) => {
              const i = n++;
              const style = {
                "--x": `${((rand(i, 1) - 0.5) * 140).toFixed(0)}px`,
                "--y": `${(-(30 + rand(i, 2) * 90)).toFixed(0)}px`,
                "--r": `${((rand(i, 3) - 0.5) * 60).toFixed(0)}deg`,
                "--d": `${(i * 0.045).toFixed(2)}s`,
              };
              return (
                <span key={ci} className="smoke-char" style={style}>
                  {ch}
                </span>
              );
            })}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}