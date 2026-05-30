"use client";

import React, { useMemo, useState, useEffect } from "react"; 
import { Button } from "@/components/ui/button";
import { MorphingText } from "../ui/primitives/texts/morphing";
import { cn } from "@/lib/utils";
import { useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "../shared/motion-wrapper";
import { useTranslation } from "@/context/language-context";
import { DotDispersalCanvas } from "../shared/dot-dispersal-canvas";

const ROLES = [
  "Network Engineer",
  "Software Engineer",
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  const translatedRoles = useMemo(() => {
    const roles = t("hero.roles");
    return Array.isArray(roles) ? roles : ROLES;
  }, [t]);

  // Handle smooth scroll
  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Dynamic Natural Typing Logic ---
  const prefix = t("hero.welcome");
  const suffix = " Bonheur Ndeze";
  const welcomeText = `${prefix}${suffix}`;
  
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    setTypedText("");
    setTypingDone(false);
    
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(welcomeText.slice(0, index + 1));
      index++;
      if (index >= welcomeText.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 60); // 60ms is a natural and snappy human typing pace

    return () => clearInterval(interval);
  }, [welcomeText]);

  // --- Sequential reveal stages ---
  const [showRoles, setShowRoles] = useState(false);
  const [showCenterpiece, setShowCenterpiece] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (!typingDone) {
      setShowRoles(false);
      setShowCenterpiece(false);
      setShowButtons(false);
      return;
    }

    const rolesTimer = setTimeout(() => {
      setShowRoles(true);
    }, 1000); // 1-second delay after typing finishes

    const centerpieceTimer = setTimeout(() => {
      setShowCenterpiece(true);
    }, 1500); // 500ms after roles

    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 2000); // 500ms after centerpiece

    return () => {
      clearTimeout(rolesTimer);
      clearTimeout(centerpieceTimer);
      clearTimeout(buttonsTimer);
    };
  }, [typingDone]);

  // Define Variants
  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  }), [shouldReduceMotion]);

  const itemVariants: Variants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 25 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    },
  }), [shouldReduceMotion]);

  return (
    <section className={cn("relative flex min-h-[100vh] flex-col items-center",
    "justify-center overflow-hidden bg-background dark:bg-[#030303] px-6 py-20 md:py-0 text-center")}>

      {/* Interactive Dot Grid Background with Cursor Dispersal */}
      <DotDispersalCanvas />

      <div className={cn("absolute inset-0 -z-10",
        "bg-[radial-gradient(ellipse_at_center,transparent_20%,theme(colors.background)_80%)]")} />

      {/* Main Content */}
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl"
      >

        <MotionH1
          className="mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gray-700 dark:text-muted-foreground">
            {typedText.slice(0, prefix.length)}
          </span>
          <span className="text-gray-900 dark:text-white">
            {typedText.slice(prefix.length)}
          </span>
          {!typingDone && (
            <span className="inline-block w-[3px] h-[0.8em] align-middle bg-foreground ml-1.5 animate-pulse" />
          )}
        </MotionH1>

        {/* Morphing Text with Loop Fix */}
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          animate={showRoles ? "visible" : "hidden"}
          className="mb-6 h-12 sm:h-20 flex justify-center items-center"
        >
            <MorphingText
                text={translatedRoles}
                loop={true}
                holdDelay={2500}
                className="font-semibold leading-none text-gray-900 dark:text-muted-foreground"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} 
            />
        </MotionDiv>

        <MotionP
          variants={itemVariants}
          initial="hidden"
          animate={showCenterpiece ? "visible" : "hidden"}
          className="mx-auto mb-10 max-w-2xl text-base text-gray-800 dark:text-muted-foreground sm:text-lg md:text-xl leading-relaxed"
        >
          {t("hero.centerpiece")}
        </MotionP>

        {/* CTA Buttons */}
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          animate={showButtons ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button 
            size="lg" 
            className="group min-w-[160px] text-base"
            onClick={handleScrollTo("#projects")}
          >
            {t("hero.ctaBuild")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="min-w-[160px] text-base"
            onClick={handleScrollTo("#contact")}
          >
            <Mail className="mr-2 h-4 w-4" />
            {t("hero.ctaContact")}
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}