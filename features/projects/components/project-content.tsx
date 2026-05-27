"use client"

import { cn } from "@/lib/utils";
import { ProjectCard } from "@/features/projects/components/project-card";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/features/projects/utils";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/features/projects/schemas";

interface ProjectPageContentProps {
  projects: Project[];
}

export default function ProjectPageContent({ projects }: ProjectPageContentProps) {
  const featuredProjects = projects?.filter((p) => p.featured) || [];
  const otherProjects = projects?.filter((p) => !p.featured) || [];

  return (
    <section className="min-h-screen bg-[#030303] noise-overlay py-32">
      <div className="container max-w-6xl mx-auto px-6 space-y-24">
        
        {/* Featured Projects */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-indigo-400">
              Core Architectures
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Featured Systems & Deployments
            </h1>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} className="w-full">
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {otherProjects.length > 0 && (
          <>
            <Separator className="bg-white/5" />

            {/* Other Projects */}
            <div className="space-y-12">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
                  Additional Work
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Experimental & Utility Repositories
                </h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {otherProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} className="w-full">
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
