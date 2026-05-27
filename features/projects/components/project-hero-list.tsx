"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./project-hero-card";
import { Button } from "@/components/ui/button";
import { itemVariants, containerHeroVariants } from "../utils";
import { Project } from "../schemas";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  // Success
  return (
    <section id="projects" className="py-32 bg-[#030303] noise-overlay border-t border-white/5">
      <div className="container max-w-6xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400/80">
            03 / Showcase Portfolio
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Featured Work
          </h2>
          <p className="mx-auto text-muted-foreground text-lg leading-relaxed font-light">
            A curated selection of production projects highlighting system design, network protocols, and robust backend implementations.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerHeroVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {projects?.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="w-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
