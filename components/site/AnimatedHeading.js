"use client";

import { useEffect, useRef, useState } from "react";
import "./animatedheading.css"

export default function AnimatedHeading({ title, as: Tag = "h2", className = "" }) {
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

  return (
    <Tag
      ref={ref}
      className={`mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl ${className}`}
    >
      <span className="reveal-mask" data-visible={visible}>
        <span className="reveal-text">{title}</span>
      </span>
    </Tag>
  );
}