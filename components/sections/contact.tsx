"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactInfos } from "@/features/contact/components/infos-side";
import { useTranslation } from "@/context/language-context";
import { motion, Variants, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";


export function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const width = useTransform(
    smoothProgress,
    [0.05, 0.45],
    ["80vw", "96vw"]
  );

  const scale = useTransform(
    smoothProgress,
    [0.05, 0.45],
    [0.9, 1]
  );

  const opacity = useTransform(
    smoothProgress,
    [0.05, 0.3],
    [0.6, 1]
  );

  // --- High-Performance Mouse-Following Spring Coordinates ---
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Create smooth lag spring effect (fluid and elastic movement)
  const springX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.1 });

  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringForm, setIsHoveringForm] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);

  const GREETINGS = [
    "Let's connect! ⚡",
    "Send a ping 🌐",
    "Secure socket ready 🔐",
    "Establish connection 🔌",
    "Say hello! 👋",
    "Route is open 🗺️",
    "Packet handshake 🤝",
    "Build together 🚀",
    "Drop a line ✉️",
    "Latency: 0ms ⚡"
  ];

  useEffect(() => {
    if (!isHoveringCard || isHoveringForm) {
      setGreetingIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500); // Cyclical update every 2.5 seconds
    return () => clearInterval(interval);
  }, [isHoveringCard, isHoveringForm]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseEnter = () => {
    if (isDesktop) setIsHoveringCard(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringCard(false);
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      aria-labelledby="contact-heading"
      className="relative w-full lg:h-[120vh] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-0 lg:py-0 bg-background dark:bg-[#030303] overflow-hidden"
    >
      {/* Cinematic ambient background glow behind the macro-container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-gray-500/5 dark:bg-gray-500/10 blur-[90px] sm:blur-[130px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />

      <div className="w-full lg:sticky lg:top-0 lg:h-screen flex items-center justify-center py-6 sm:py-8 lg:py-0">
        <motion.div
          style={isDesktop ? { width, scale, opacity } : undefined}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn("w-full lg:h-[90vh] flex flex-col justify-start relative rounded-3xl sm:rounded-[42px] border border-border bg-[#030303] dark:bg-white backdrop-blur-2xl will-change-transform",
            "p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden select-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.03] before:to-transparent before:pointer-events-none"
          )}
        >
          <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 lg:items-start overflow-x-hidden lg:overflow-x-visible pb-0 lg:pb-0">
            {/* Left Column */}
            <div className="w-full lg:col-span-5 space-y-6 lg:space-y-12 text-left">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-gray-50 dark:text-gray-700 font-bold">
                  {t("contact.badge")}
              </span>
              <div className="space-y-2">
                <h2
                  id="contact-heading"
                  className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-gray-50 dark:text-gray-900 leading-tight mt-2 lg:mt-4"
                >
                  {t("contact.title")}
                </h2>
              </div>
              <ContactInfos />
            </div>

            {/* Right Column: Contact Form */}
            <div 
              onMouseEnter={() => setIsHoveringForm(true)}
              onMouseLeave={() => setIsHoveringForm(false)}
              className="w-full lg:col-span-7"
            >
              <div className="bg-white dark:bg-[#030303] backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/5 dark:border-black/5 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.02] dark:from-indigo-500/[0.05] to-transparent pointer-events-none" />
                <div className="overflow-y-auto flex-1">
                  <ContactForm />
                </div>
              </div>

          </div>
        </motion.div>
      </div>

      {/* Custom Spring Mouse-Follower Tooltip */}
      <AnimatePresence>
        {isDesktop && isHoveringCard && !isHoveringForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              left: springX,
              top: springY,
              x: "-50%",
              y: "-140%",
              pointerEvents: "none",
              zIndex: 100,
            }}
            className="flex items-center justify-center bg-white/90 dark:bg-[#0a0a0c]/90 border border-black/10 dark:border-white/10 shadow-xl rounded-full px-3.5 py-1.5 backdrop-blur-md"
          >
            <motion.span
              key={greetingIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono font-bold text-black dark:text-white whitespace-nowrap"
            >
              {GREETINGS[greetingIndex]}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
