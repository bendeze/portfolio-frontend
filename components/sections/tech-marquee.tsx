"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Terminal,
  Activity,
  Radio
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  protocol: string;
  icon: React.ReactNode;
}

const SOFTWARE_STACK: TechItem[] = [
  { name: "Python", category: "Backend", protocol: "PY_3.12", icon: <Code2 className="h-3.5 w-3.5" /> },
  { name: "Django", category: "Framework", protocol: "ASGI/WSGI", icon: <Server className="h-3.5 w-3.5" /> },
  { name: "FastAPI", category: "API", protocol: "HTTP/2", icon: <Cpu className="h-3.5 w-3.5" /> },
  { name: "TypeScript", category: "Language", protocol: "ES_NEXT", icon: <Layers className="h-3.5 w-3.5" /> },
  { name: "Next.js", category: "Framework", protocol: "SSR/RSC", icon: <Boxes className="h-3.5 w-3.5" /> },
  { name: "React", category: "Library", protocol: "VDOM", icon: <Zap className="h-3.5 w-3.5" /> },
  { name: "PostgreSQL", category: "Database", protocol: "PG_WIRE", icon: <Database className="h-3.5 w-3.5" /> },
  { name: "Redis", category: "Cache", protocol: "RESP_3", icon: <Flame className="h-3.5 w-3.5" /> },
  { name: "Docker", category: "DevOps", protocol: "OCI_SPEC", icon: <Boxes className="h-3.5 w-3.5" /> },
  { name: "Celery", category: "Task Queue", protocol: "AMQP/REDIS", icon: <Zap className="h-3.5 w-3.5" /> }
];

const NETWORK_STACK: TechItem[] = [
  { name: "Cisco IOS-XE", category: "Enterprise", protocol: "NETCONF", icon: <Network className="h-3.5 w-3.5" /> },
  { name: "NX-OS Fabric", category: "Data Center", protocol: "EVPN-VXLAN", icon: <Shield className="h-3.5 w-3.5" /> },
  { name: "BGP Protocol", category: "Routing", protocol: "BGP-4/MP-BGP", icon: <Globe className="h-3.5 w-3.5" /> },
  { name: "OSPF Protocol", category: "Interior", protocol: "OSPFv3", icon: <Layers className="h-3.5 w-3.5" /> },
  { name: "IPsec / WireGuard", category: "Security", protocol: "IKEv2/UDP", icon: <Lock className="h-3.5 w-3.5" /> },
  { name: "Cisco ASA / FTD", category: "Firewall", protocol: "STATEFUL", icon: <Flame className="h-3.5 w-3.5" /> },
  { name: "Wireshark", category: "Analysis", protocol: "PCAP/PCAPNG", icon: <Eye className="h-3.5 w-3.5" /> },
  { name: "Ansible", category: "Automation", protocol: "SSH/YAML", icon: <Terminal className="h-3.5 w-3.5" /> },
  { name: "Juniper Junos", category: "Systems", protocol: "YANG/RPC", icon: <Server className="h-3.5 w-3.5" /> },
  { name: "Nginx", category: "Reverse Proxy", protocol: "TLS_1.3", icon: <Cpu className="h-3.5 w-3.5" /> }
];

export function TechMarqueeSection() {
  const doubleSoftwareStack = [...SOFTWARE_STACK, ...SOFTWARE_STACK];
  const doubleNetworkStack = [...NETWORK_STACK, ...NETWORK_STACK];

  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  return (
    <section 
      id="tech-stack" 
      aria-label="Technologies and Integration Stack"
      className="relative w-full py-10 bg-background overflow-hidden select-none border-y-[0.5px] border-zinc-200/60 dark:border-zinc-800/60"
    >
      {/* --- UNIQUE LASER PACKET TRACERS (TOP & BOTTOM FIBER BEAMS) --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none z-30">
        <motion.div
          animate={{
            x: ["-100%", "200%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-48 h-full bg-gradient-to-r from-transparent via-[#ebcb00] to-transparent shadow-[0_0_8px_#ebcb00]"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none z-30">
        <motion.div
          animate={{
            x: ["200%", "-100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="w-48 h-full bg-gradient-to-r from-transparent via-[#2a7c13] dark:via-[#ebcb00] to-transparent shadow-[0_0_8px_#ebcb00]"
        />
      </div>

      {/* Edge Gradient Mask Overlays */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

      {/* --- TELEMETRY STATUS BAR --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between text-[11px] font-mono tracking-wider">
        <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
          
        </div>

        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-[10px]">
          <Activity className="h-3 w-3 text-[#ebcb00] animate-pulse" />
          <span className="hidden sm:inline">
            {activeTech ? `INSPECT: [${activeTech.protocol}]` : "SYNC: ASYNC_IO // 0ms LOSS"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full relative z-10">
        
        {/* Row 1: Software Stack Scrolling Left */}
        <div className="flex w-full overflow-hidden mask-fade py-0.5">
          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max items-center">
            {doubleSoftwareStack.map((tech, idx) => (
              <motion.div 
                key={`soft-${idx}`}
                onMouseEnter={() => setActiveTech(tech)}
                onMouseLeave={() => setActiveTech(null)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group/tech inline-flex items-center gap-2 py-1 px-3 bg-transparent select-none cursor-pointer font-mono border-b border-dashed border-zinc-300/80 dark:border-zinc-800 hover:border-[#2a7c13] dark:hover:border-[#ebcb00] transition-all relative"
              >
                <span className="text-[#ebcb00] font-bold text-xs group-hover/tech:scale-125 transition-transform duration-200">#</span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover/tech:text-[#2a7c13] dark:group-hover/tech:text-[#ebcb00] transition-colors whitespace-nowrap">
                  {tech.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                  /{tech.category}
                </span>

                {/* Micro Protocol ACK Indicator on Hover */}
                <span className="opacity-0 group-hover/tech:opacity-100 text-[9px] font-bold text-[#ebcb00] bg-zinc-100 dark:bg-zinc-900 border border-[#ebcb00]/40 rounded px-1 py-0.2 transition-opacity duration-200 shadow-xs">
                  ACK
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2: Network & Automation Stack Scrolling Right */}
        <div className="flex w-full overflow-hidden mask-fade py-0.5">
          <div className="flex gap-4 animate-marquee-reverse hover:[animation-play-state:paused] w-max items-center">
            {doubleNetworkStack.map((tech, idx) => (
              <motion.div 
                key={`net-${idx}`}
                onMouseEnter={() => setActiveTech(tech)}
                onMouseLeave={() => setActiveTech(null)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group/tech inline-flex items-center gap-2 py-1 px-3 bg-transparent select-none cursor-pointer font-mono border-b border-dashed border-zinc-300/80 dark:border-zinc-800 hover:border-[#2a7c13] dark:hover:border-[#ebcb00] transition-all relative"
              >
                <span className="text-[#ebcb00] font-bold text-xs group-hover/tech:scale-125 transition-transform duration-200">#</span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover/tech:text-[#2a7c13] dark:group-hover/tech:text-[#ebcb00] transition-colors whitespace-nowrap">
                  {tech.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                  /{tech.category}
                </span>

                {/* Micro Protocol ACK Indicator on Hover */}
                <span className="opacity-0 group-hover/tech:opacity-100 text-[9px] font-bold text-[#ebcb00] bg-zinc-100 dark:bg-zinc-900 border border-[#ebcb00]/40 rounded px-1 py-0.2 transition-opacity duration-200 shadow-xs">
                  ACK
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
