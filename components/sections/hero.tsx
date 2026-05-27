"use client";

import React, { useMemo } from "react"; 
import { Button } from "@/components/ui/button";
import { MorphingText } from "../ui/primitives/texts/morphing";
import { cn } from "@/lib/utils";
import { useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { StatusIndicator } from "../shared/status-indicator/status-indicator";
import { MotionDiv, MotionH1, MotionP } from "../shared/motion-wrapper";
import { AntigravityCanvas } from "../shared/antigravity-canvas";
import { useTranslation } from "@/context/language-context";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  // Load localized roles array dynamically
  const roles = useMemo(() => {
    const rawRoles = t("hero.roles");
    return Array.isArray(rawRoles) ? rawRoles : ["Software Developer", "Network Engineer"];
  }, [t]);

  // Handle smooth scroll
  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  }), [shouldReduceMotion]);

  return (
    <section className={cn(
      "relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden",
      "bg-[#030303] px-6 text-center noise-overlay pt-20"
    )}>

      {/* Physics-based Antigravity Interactive Background */}
      {!shouldReduceMotion && <AntigravityCanvas />}

      {/* Radial soft glowing orbs (Antigravity background style) */}
      <div className={cn(
        "absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 -z-10",
        "w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-indigo-500 pointer-events-none"
      )} />
      <div className={cn(
        "absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 -z-10",
        "w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 bg-blue-500 pointer-events-none"
      )} />

      {/* Soft geometric background grid lines */}
      <div className={cn(
        "absolute inset-0 pointer-events-none -z-20",
        "bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]",
        "bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)]"
      )} />

      {/* Main Content */}
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mt-10"
      >
        {/* Availability Badge */}
        <MotionDiv variants={itemVariants} className="mb-8 flex justify-center">
          <div className={cn(
            "inline-flex items-center rounded-full glassmorphism px-4 py-1.5",
            "text-sm font-medium border-glow tracking-wide"
          )}>
            <StatusIndicator status="active" label={t("hero.status")} labelClassName="font-medium text-white/90" />
          </div>
        </MotionDiv>

        {/* Cinematic Title */}
        <MotionH1
          variants={itemVariants}
          className={cn(
            "mb-4 text-5xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl",
            "text-cinematic select-none"
          )}
        >
          {t("hero.title")}
        </MotionH1>

        {/* Morphing Text with Loop Fix */}
        <MotionDiv variants={itemVariants} className="mb-6 h-12 sm:h-20 flex justify-center items-center">
          <MorphingText
            text={roles}
            loop={true}
            holdDelay={3000}
            className="font-mono uppercase tracking-[0.25em] text-white/60 font-semibold"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.30rem)" }} 
          />
        </MotionDiv>

        <MotionP
          variants={itemVariants}
          className="mx-auto mb-12 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed font-light"
        >
          {t("hero.description")}
        </MotionP>

        {/* CTA Buttons */}
        <MotionDiv variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            size="lg" 
            className={cn(
              "group min-w-[180px] text-base cursor-pointer bg-white text-black hover:bg-white/90",
              "rounded-full transition-all duration-300 font-medium tracking-wide shadow-lg hover:shadow-white/5"
            )}
            onClick={handleScrollTo("#projects")}
          >
            {t("hero.ctaExplore")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <Button 
            size="lg" 
            className={cn(
              "min-w-[180px] text-base cursor-pointer rounded-full font-medium tracking-wide border-white/10 hover:bg-white/5",
              "glassmorphism transition-all duration-300 border-glow text-white/95"
            )}
            onClick={handleScrollTo("#contact")}
          >
            <Mail className="mr-2 h-4 w-4 text-white/70" />
            {t("hero.ctaContact")}
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}