"use client";

import React from "react";
import { 
  Code2, 
  Database, 
  Server, 
  Cpu, 
  Layers, 
  Zap, 
  Boxes, 
  Lock, 
  Globe, 
  Shield, 
  Flame, 
  Network, 
  Eye, 
  Terminal 
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const SOFTWARE_STACK: TechItem[] = [
  { name: "Python", category: "Backend", icon: <Code2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Django", category: "Framework", icon: <Server className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "FastAPI", category: "API", icon: <Cpu className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "TypeScript", category: "Language", icon: <Layers className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Next.js", category: "Framework", icon: <Boxes className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "React", category: "Library", icon: <Zap className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "PostgreSQL", category: "Database", icon: <Database className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Redis", category: "Cache", icon: <Flame className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Docker", category: "DevOps", icon: <Boxes className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Celery", category: "Task Queue", icon: <Zap className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> }
];

const NETWORK_STACK: TechItem[] = [
  { name: "Cisco IOS-XE", category: "Enterprise", icon: <Network className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "NX-OS Data Center", category: "Routing", icon: <Shield className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "BGP Protocol", category: "Routing", icon: <Globe className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "OSPF Protocol", category: "Interior", icon: <Layers className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "VPN Tunneling", category: "Security", icon: <Lock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Cisco ASA", category: "Firewall", icon: <Flame className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Wireshark", category: "Analysis", icon: <Eye className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Ansible", category: "Automation", icon: <Terminal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Juniper Junos", category: "Systems", icon: <Server className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> },
  { name: "Nginx Proxy", category: "Web Server", icon: <Cpu className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> }
];

export function TechMarqueeSection() {
  // Duplicate arrays to create a seamless infinite scrolling effect
  const doubleSoftwareStack = [...SOFTWARE_STACK, ...SOFTWARE_STACK];
  const doubleNetworkStack = [...NETWORK_STACK, ...NETWORK_STACK];

  return (
    <section 
      id="tech-stack" 
      aria-label="Technologies and Integration Stack"
      className="relative w-full py-12 bg-background dark:bg-[#030303] overflow-hidden select-none"
    >
      {/* Premium Gradient Fade Overlays at Screen Edges */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-background dark:from-[#030303] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-background dark:from-[#030303] to-transparent z-20 pointer-events-none" />

      {/* Subtle neutral ambient background orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[150px] rounded-full bg-zinc-500/5 blur-[80px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[150px] rounded-full bg-zinc-500/5 blur-[80px] pointer-events-none -z-10" />

      <div className="flex flex-col gap-5 w-full relative z-10">
        
        {/* Row 1: Software Stack Scrolling Left */}
        <div className="flex w-full overflow-hidden mask-fade py-1">
          <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] w-max">
            {doubleSoftwareStack.map((tech, idx) => (
              <div 
                key={`soft-${idx}`}
                className="flex items-center gap-3 py-2.5 px-5 rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.02] backdrop-blur-sm shadow-sm dark:shadow-md transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-200/50 dark:hover:bg-white/[0.04]"
              >
                <div className="p-1.5 rounded-lg bg-zinc-200/40 dark:bg-white/5 shadow-inner">
                  {tech.icon}
                </div>
                <div className="flex flex-col text-left whitespace-nowrap min-w-max flex-shrink-0">
                  <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 leading-none whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 dark:text-muted-foreground mt-0.5 leading-none whitespace-nowrap">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Network & Automation Stack Scrolling Right */}
        <div className="flex w-full overflow-hidden mask-fade py-1">
          <div className="flex gap-5 animate-marquee-reverse hover:[animation-play-state:paused] w-max">
            {doubleNetworkStack.map((tech, idx) => (
              <div 
                key={`net-${idx}`}
                className="flex items-center gap-3 py-2.5 px-5 rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.02] backdrop-blur-sm shadow-sm dark:shadow-md transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-200/50 dark:hover:bg-white/[0.04]"
              >
                <div className="p-1.5 rounded-lg bg-zinc-200/40 dark:bg-white/5 shadow-inner">
                  {tech.icon}
                </div>
                <div className="flex flex-col text-left whitespace-nowrap min-w-max flex-shrink-0">
                  <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 leading-none whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 dark:text-muted-foreground mt-0.5 leading-none whitespace-nowrap">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
