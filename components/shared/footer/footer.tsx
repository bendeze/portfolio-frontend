"use client";

import React, { useState, useEffect, useRef } from "react";
import { FooterBrand } from "./footer-brand";
import { Socials } from "../socials";
import { EmailCTA } from "./email-cta";
import { NavLinks } from "../navbar/nav-links";
import { MotionDiv, MotionH1 } from "../motion-wrapper";
import { useTranslation } from "@/context/language-context";
import { useInView } from "framer-motion";

const LANGUAGES_MAP = [
  { code: "en", text: "Thank you for visiting" },
  { code: "fr", text: "Merci de votre visite" },
  { code: "sw", text: "Asante kwa kutembelea" },
  { code: "es", text: "Gracias por su visita" },
  { code: "zh", text: "感谢您的访问" },
  { code: "ru", text: "Спасибо за визит" }
];

export function Footer() {
  const { t, lang } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const [displayedText, setDisplayedText] = useState("");
  const [queueIndex, setQueueIndex] = useState(0);
  const [state, setState] = useState<"idle" | "typing" | "waiting" | "erasing" | "finished">("idle");
  const [charIndex, setCharIndex] = useState(0);

  // Build dynamic queue finishing with the user's current site language
  const currentLang = lang || "en";
  const otherLanguages = LANGUAGES_MAP.filter((item) => item.code !== currentLang);
  const currentLanguageItem = LANGUAGES_MAP.find((item) => item.code === currentLang) || LANGUAGES_MAP[0];
  const queue = [...otherLanguages, currentLanguageItem];

  useEffect(() => {
    if (isInView && state === "idle") {
      setState("typing");
    }
  }, [isInView, state]);

  useEffect(() => {
    if (state === "idle" || state === "finished") return;

    const targetText = queue[queueIndex].text;

    if (state === "typing") {
      if (charIndex < targetText.length) {
        // Every typing action must take exactly 5 seconds (5000ms / N)
        const speed = 4000 / targetText.length;
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + targetText[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        setState("waiting");
      }
    }

    if (state === "waiting") {
      const isFinalLanguage = queueIndex === queue.length - 1;
      const timer = setTimeout(() => {
        if (isFinalLanguage) {
          setState("finished");
        } else {
          setState("erasing");
        }
      }, 1500); // Let the reader view the fully typed text for 1.5 seconds
      return () => clearTimeout(timer);
    }

    if (state === "erasing") {
      if (displayedText.length > 0) {
        // Erase quickly (e.g. 15ms per character)
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 13);
        return () => clearTimeout(timer);
      } else {
        // Text completely erased, advance queue
        setCharIndex(0);
        setQueueIndex((prev) => prev + 1);
        setState("typing");
      }
    }
  }, [state, charIndex, queueIndex, displayedText, isInView, queue]);

  return (
    <footer className="bg-background border-t border-border/40 font-mono">
      <div className="w-full py-12 px-6 md:px-12 lg:px-20">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 w-full">
          <FooterBrand />
          <div className="flex flex-row items-start justify-center md:justify-end gap-8 sm:gap-22 md:gap-28 w-full md:w-auto">
            <NavLinks direction="column" className="space-y-1.5 pt-1 sm:pt-0" />
            <div className="flex flex-col gap-4">
              <EmailCTA />
              <Socials showModeToggle={false} showYoutube={true} showWhatsapp={true} />
            </div>
          </div>
        </div>

        {/* Dynamic Typewriter Cinematic Text */}
        <MotionDiv ref={containerRef} className="my-16 text-center select-none overflow-hidden w-full">
          <MotionH1
            className="mb-4 text-4xl font-mono tracking-tighter sm:text-6xl md:text-7xl lg:text-[6.2vw] leading-none text-[#ebcb00] font-mono break-words lg:whitespace-nowrap w-full"
          >
            {displayedText}
            {state !== "finished" && (
              <span className="animate-pulse duration-700 text-gray-900 dark:text-gray-100 font-thin ml-1">|</span>
            )}
          </MotionH1>
        </MotionDiv>

        <div className="mt-10 mx-auto border-t-2 border-border/40 border-dashed pt-6 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <p className="text-xs text-muted-foreground font-mono">&copy; {new Date().getFullYear()} Emmanuel Bonheur Ndeze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
