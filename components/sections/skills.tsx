"use client";

import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Network, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/language-context";

// --- Static Data Structure focused exclusively on the two roles ---
const SKILL_PILLARS = [
  {
    icon: <Code2 className="h-6 w-6 text-indigo-400" />,
    color: "from-indigo-500/10 to-purple-500/5",
    glowColor: "rgba(99, 102, 241, 0.15)",
    groups: [
      {
        skills: ["Python", "Django", "Django REST Framework", "FastAPI", "TypeScript", "React", "Next.js"],
      },
      {
        skills: ["PostgreSQL", "MySQL", "Redis", "Celery", "Schema Design", "Query Optimization"],
      },
      {
        skills: ["RESTful APIs & GraphQL", "Docker & Docker Compose", "Nginx", "Git & GitHub Versioning"],
      },
    ]
  },
  {
    icon: <Network className="h-6 w-6 text-blue-400" />,
    color: "from-blue-500/10 to-indigo-500/5",
    glowColor: "rgba(59, 130, 246, 0.15)",
    groups: [
      {
        skills: ["BGP / OSPF Protocols", "VLANs & VRFs", "IP Routing & Subnetting", "Switching & Loop Prevention"],
      },
      {
        skills: ["Cisco IOS-XE / NX-OS", "Cisco Firepower / ASA Firewalls", "VPN Tunneling (IPsec/SSL)", "ACLs & Traffic Filtering"],
      },
      {
        skills: ["Wireshark Packet Analysis", "Ansible Network Automation", "Python Automation Scripting", "Juniper Junos Systems"],
      },
    ]
  }
];

// Reusable premium spotlight card component matching Next.js/Vercel styling
function SpotlightCard({
  children,
  className,
  glowColor = "rgba(255, 255, 255, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0c]/60 p-8 glassmorphism transition-all duration-500",
        className
      )}
    >
      {/* Background Spotlight Glow */}
      {!shouldReduceMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      
      {/* Border Spotlight Glow */}
      {!shouldReduceMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
            maskImage: "linear-gradient(black, black) exclude, linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black) border-box",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  const localizedPillars = useMemo(() => {
    return [
      {
        ...SKILL_PILLARS[0],
        title: t("skills.pillars.dev.title"),
        subtitle: t("skills.pillars.dev.subtitle"),
        description: t("skills.pillars.dev.description"),
        groups: [
          {
            ...SKILL_PILLARS[0].groups[0],
            name: t("skills.pillars.dev.groups.g1"),
          },
          {
            ...SKILL_PILLARS[0].groups[1],
            name: t("skills.pillars.dev.groups.g2"),
          },
          {
            ...SKILL_PILLARS[0].groups[2],
            name: t("skills.pillars.dev.groups.g3"),
          },
        ]
      },
      {
        ...SKILL_PILLARS[1],
        title: t("skills.pillars.net.title"),
        subtitle: t("skills.pillars.net.subtitle"),
        description: t("skills.pillars.net.description"),
        groups: [
          {
            ...SKILL_PILLARS[1].groups[0],
            name: t("skills.pillars.net.groups.g1"),
          },
          {
            ...SKILL_PILLARS[1].groups[1],
            name: t("skills.pillars.net.groups.g2"),
          },
          {
            ...SKILL_PILLARS[1].groups[2],
            name: t("skills.pillars.net.groups.g3"),
          },
        ]
      }
    ];
  }, [t]);

  return (
    <section 
      id="skills" 
      aria-labelledby="skills-heading"
      className="relative py-32 bg-[#030303] noise-overlay overflow-hidden"
    >
      {/* Glowing atmospheric orbs behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.03] bg-indigo-500 pointer-events-none -z-10" />

      <div className="container px-6 max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400/80">
            {t("skills.badge")}
          </span>
          <h2 
            id="skills-heading"
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            {t("skills.description")}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {localizedPillars.map((pillar, pillarIdx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: pillarIdx * 0.15 }}
            >
              <SpotlightCard glowColor={pillar.glowColor} className="h-full">
                {/* Pillar Header */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-mono text-white/40 uppercase tracking-wider mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                {/* Groups & Skills list */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  {pillar.groups.map((group) => (
                    <div key={group.name} className="space-y-3">
                      <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-300/80">
                        {group.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <div 
                            key={skill}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/70",
                              "bg-white/[0.02] border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                            )}
                          >
                            <CheckCircle2 className="h-3 w-3 text-emerald-500/80 flex-shrink-0" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}