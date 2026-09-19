"use client";

import React, { useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollRevealIntroProps {
  text: string;
}

export function ScrollRevealIntro({ text }: ScrollRevealIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.45"] // Starts typing as it enters, finishes at 45% viewport height
  });

  // Map scroll progress [0, 1] directly to [0, text.length]
  const textLength = useTransform(scrollYProgress, [0, 1], [0, text.length]);
  const [typedText, setTypedText] = useState("");

  useMotionValueEvent(textLength, "change", (latest) => {
    setTypedText(text.slice(0, Math.floor(latest)));
  });

  const isDone = typedText.length >= text.length;

  return (
    <div ref={containerRef} className="w-full text-left my-4 relative">
      {/* Invisible static text placeholder to lock layout height */}
      <p className="text-lg sm:text-xl lg:text-2xl font-mono font-medium leading-relaxed tracking-tight opacity-0 select-none pointer-events-none">
        {text}
      </p>

      {/* Absolutely positioned typing container */}
      <div className="absolute inset-0">
        <p className="text-lg sm:text-xl lg:text-2xl font-mono font-medium leading-relaxed tracking-tight text-gray-900 dark:text-zinc-100">
          {typedText}
          {!isDone && (
            <span className="inline-block w-[3px] h-[0.8em] align-middle bg-[#ebcb00] ml-1.5 animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}
