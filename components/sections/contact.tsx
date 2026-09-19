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
      className="relative w-full py-16 sm:py-20 lg:py-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div className="w-full max-w-7xl flex items-center justify-center">
        <motion.div
          style={isDesktop ? { width, scale, opacity } : undefined}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "w-full relative rounded-3xl sm:rounded-[36px] border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent will-change-transform",
            "p-6 sm:p-8 lg:p-10 shadow-xs overflow-hidden select-none"
          )}
        >
          <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-start">
            {/* Left Column */}
            <div className="w-full lg:col-span-5 space-y-4 lg:space-y-6 text-left">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#ebcb00] font-bold">
                {t("contact.badge")}
              </span>
              <div className="space-y-2">
                <h2
                  id="contact-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-foreground leading-tight mt-1 lg:mt-2"
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
              <div className="bg-transparent p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-dashed border-zinc-300/80 dark:border-zinc-800 relative overflow-hidden transition-colors">
                <div className="relative z-10">
                  <ContactForm />
                </div>
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
            className="flex items-center justify-center bg-card/90 border border-border shadow-xl rounded-full px-3.5 py-1.5 backdrop-blur-md"
          >
            <motion.span
              key={greetingIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono font-bold text-foreground whitespace-nowrap"
            >
              {GREETINGS[greetingIndex]}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
