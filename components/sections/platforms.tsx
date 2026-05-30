"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, Variants, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "@/context/language-context";
import { ScrollRevealIntro } from "./platforms/scroll-reveal-intro";
import { ProjectCard, ProjectData } from "./platforms/project-card";
import { ProjectDetailsModal } from "./platforms/project-details-modal";
import { InvitationBanner } from "./platforms/invitation-banner";

export function PlatformsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
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

  const scale = useTransform(
    smoothProgress,
    [0.05, 0.45],
    [0.92, 1]
  );

  const opacity = useTransform(
    smoothProgress,
    [0.05, 0.3],
    [0.7, 1]
  );

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setExpandedIndex(index);
    }, 3000);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const introPhrase = t("platforms.intro");

  const projectsData: ProjectData[] = [
    {
      id: 0,
      badge: t("platforms.boutika.badge"),
      title: t("platforms.boutika.title"),
      iconName: "globe",
      p1: t("platforms.boutika.p1"),
      p2: t("platforms.boutika.p2"),
      p3: t("platforms.boutika.p3"),
      techLabel: t("platforms.boutika.arch"),
      tags: [
        t("platforms.boutika.tag1"),
        t("platforms.boutika.tag2"),
        t("platforms.boutika.tag3"),
        t("platforms.boutika.tag4"),
        t("platforms.boutika.tag5"),
        t("platforms.boutika.tag6"),
      ],
      ctas: [
        {
          label: t("platforms.boutika.ctaOrg"),
          href: "https://github.com/boutika-platform",
          icon: "github"
        }
      ],
      detailedP1: t("platforms.boutika.detailedP1"),
      detailedP2: t("platforms.boutika.detailedP2"),
      detailedP3: t("platforms.boutika.detailedP3"),
    },
    {
      id: 1,
      badge: t("platforms.netpulse.badge"),
      title: t("platforms.netpulse.title"),
      iconName: "terminal",
      p1: t("platforms.netpulse.p1"),
      p2: t("platforms.netpulse.p2"),
      techLabel: t("platforms.netpulse.diag"),
      tags: [
        t("platforms.netpulse.tag1"),
        t("platforms.netpulse.tag2"),
        t("platforms.netpulse.tag3"),
        t("platforms.netpulse.tag4"),
        t("platforms.netpulse.tag5"),
        t("platforms.netpulse.tag6"),
      ],
      ctas: [
        {
          label: t("platforms.netpulse.ctaRepo"),
          href: "https://github.com/bonheurNE07/netpulse",
          icon: "github"
        },
        {
          label: t("platforms.netpulse.ctaPypi"),
          href: "https://pypi.org/project/netpulse/",
          icon: "external"
        }
      ],
      detailedP1: t("platforms.netpulse.detailedP1"),
      detailedP2: t("platforms.netpulse.detailedP2"),
    }
  ];

  const selectedProject = expandedIndex !== null ? projectsData[expandedIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="platforms-heading"
      className="relative w-full py-14 bg-background dark:bg-[#030303] px-4 sm:px-8 lg:px-16 overflow-hidden select-none"
    >
      {/* Subtle ambient lighting details (Strictly neutral/gray) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-zinc-500/5 blur-[120px] pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        style={isDesktop ? { scale, opacity } : undefined}
        className="w-full relative z-10"
      >

        {/* Section Header */}
        <motion.div variants={headerVariants} className="text-left space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400 font-bold">
            {t("platforms.badge")}
          </span>
        </motion.div>

        {/* Scroll-Linked Typing Intro Text */}
        <ScrollRevealIntro key={introPhrase} text={introPhrase} />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-12">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              hoveredIndex={hoveredIndex}
              cardVariants={cardVariants}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>

        {/* --- INVITATION TO VIEW OTHER PROJECTS --- */}
        <InvitationBanner
          title={t("platforms.moreProjects.title")}
          desc={t("platforms.moreProjects.desc")}
          ctaGithub={t("platforms.moreProjects.ctaGithub")}
          ctaPages={t("platforms.moreProjects.ctaPages")}
          cardVariants={cardVariants}
        />

      </motion.div>

      {/* --- PREMIUM DYNAMIC WIDESCREEN MODAL EXPAND LAYER --- */}
      <ProjectDetailsModal
        isOpen={expandedIndex !== null}
        onClose={() => setExpandedIndex(null)}
        project={selectedProject}
      />
    </section>
  );
}
