"use client";

import { motion } from "framer-motion";
import { useFeaturedProjects } from "../hooks/use-projects";
import { ProjectCard } from "./project-hero-card";
import { ProjectSkeleton } from "./project-skeleton";
import { Button } from "@/components/ui/button";
import { itemVariants, containerHeroVariants } from "../utils";

export function ProjectList() {
  const { data: projects, isLoading, isError } = useFeaturedProjects(4);

  // Loading
  if (isLoading) {
    return (
      <section id="projects" className="container py-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Work</h2>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
        <div className="grid grid-cols-1 px-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // Error
  if (isError) {
    return (
      <section id="projects" className="container py-24 text-center">
        <h2 className="text-xl font-semibold text-destructive">Failed to load projects</h2>
        <p className="text-muted-foreground mb-4">The backend might be sleeping.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </section>
    );
  }

  // Success
  return (
    <section id="projects" className="container max-w-7xl mx-auto py-24 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Featured Work
        </h2>
        <p className="mx-auto text-muted-foreground md:text-lg">
          A curated selection of projects demonstrating full-stack capabilities, 
          from system architecture to frontend design.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerHeroVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center"
      >
        {projects?.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
