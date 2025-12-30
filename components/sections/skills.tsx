"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Layout,
  TerminalSquare,
  Network,
} from "lucide-react"; // Icons for categories
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// --- Data Structure ---
// Grouping skills shows architectural thinking
const SKILL_CATEGORIES = [
    {
      title: "Backend Engineering",
      description: "Designing scalable APIs, business logic, and distributed services.",
      icon: <Layout className="h-5 w-5" />,
      skills: [
        "Python",
        "Django / Django REST Framework",
        "FastAPI",
        "RESTful APIs",
        "GraphQL",
        "Celery",
        "Redis",
      ],
    },
    {
      title: "Databases & Data Modeling",
      description: "Relational databases, schema design, and performance optimization.",
      icon: <Database className="h-5 w-5" />,
      skills: [
        "PostgreSQL",
        "MySQL",
        "Database schema design",
        "Query optimization",
      ],
    },
    {
      title: "Networking & Infrastructure",
      description: "Networking fundamentals and production infrastructure awareness.",
      icon: <Network className="h-5 w-5" />,
      skills: [
        "TCP/IP, DNS, HTTP",
        "Cisco Networking (Certified)",
        "Linux systems",
        "Docker & Nginx",
      ],
    },
    {
      title: "DevOps & Tooling",
      description: "Deployment workflows, automation, and development tooling.",
      icon: <TerminalSquare className="h-5 w-5" />,
      skills: [
        "Git & GitHub",
        "CI/CD pipelines",
        "Docker & Gunicorn",
        "Cloud / VPS deployment",
      ],
    },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5 },
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
            A pragmatic, production-focused stack built around performance,
            scalability, and long-term maintainability.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-muted/40 bg-muted/5 transition-colors hover:bg-muted/10 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md border bg-background text-primary">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="bg-background text-sm font-normal border-border hover:border-primary/40 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}