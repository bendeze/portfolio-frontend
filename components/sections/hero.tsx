"use client";

import React, { useMemo } from "react"; 
import { Button } from "@/components/ui/button";
import { MorphingText } from "../ui/primitives/texts/morphing";
import { cn } from "@/lib/utils";
import { useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { StatusIndicator } from "../shared/status-indicator/status-indicator";
import { MotionDiv, MotionH1, MotionP } from "../shared/motion-wrapper";

const ROLES = [
  "Backend Software Developer",
  "Network Engineer",
  "AI/ML Enthusiast",
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Handle smooth scroll
  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- 1. Define Variants INSIDE to use 'shouldReduceMotion' ---
  // We use useMemo so this object isn't re-created on every single render
  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // If reduced motion is on, show everything instantly (no delay)
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  }), [shouldReduceMotion]);

  const itemVariants: Variants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      // If reduced motion is on, just fade in (y: 0). Don't slide up (y: 20).
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    },
  }), [shouldReduceMotion]);

  return (
    <section className={cn("relative flex min-h-[90vh] flex-col items-center",
    "justify-center overflow-hidden bg-background px-6 text-center")}>

      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
          "[background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        )}
      />
      <div className={cn("absolute inset-0 -z-10",
        "bg-[radial-gradient(ellipse_at_center,transparent_20%,theme(colors.background)_80%)]")} />

      {/* Main Content */}
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl"
      >
        {/* Badge */}
        <MotionDiv variants={itemVariants} className="mb-6 flex justify-center">
          <div className={cn("inline-flex items-center rounded-full",
            "border border-border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm")}>
            <StatusIndicator status="active" label="Available for new projects" labelClassName='text-bold' />
          </div>
        </MotionDiv>

        <MotionH1
          variants={itemVariants}
          className="mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Hi, I&apos;m <span className="text-foreground">Bonheur Ndeze</span>
        </MotionH1>

        {/* Morphing Text with Loop Fix */}
        <MotionDiv variants={itemVariants} className="mb-6 h-12 sm:h-20 flex justify-center items-center">
            <MorphingText
                text={ROLES}
                loop={true}
                holdDelay={2500}
                className="font-semibold leading-none text-muted-foreground"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} 
            />
        </MotionDiv>

        <MotionP
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
        >
          I design scalable backend systems and secure network architectures
          for production-grade applications.
        </MotionP>

        {/* CTA Buttons */}
        <MotionDiv variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            size="lg" 
            className="group min-w-[160px] text-base"
            onClick={handleScrollTo("#projects")}
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="min-w-[160px] text-base"
            onClick={handleScrollTo("#contact")}
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}