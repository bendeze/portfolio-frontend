"use client";

import React, { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: "router" | "server" | "database" | "switch" | "edge";
  pulse: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

const NODE_LABELS = [
  { label: "BGP_AS65001", type: "router" },
  { label: "CORE_RT01", type: "router" },
  { label: "OSPF_A0", type: "switch" },
  { label: "NXOS_FABRIC", type: "switch" },
  { label: "FASTAPI_GW", type: "server" },
  { label: "DJANGO_ASGI", type: "server" },
  { label: "PG_PRIMARY", type: "database" },
  { label: "REDIS_CACHE", type: "database" },
  { label: "EDGE_PROXY", type: "edge" },
  { label: "IPSEC_TUNNEL", type: "router" },
  { label: "CELERY_Q", type: "server" },
  { label: "DOCKER_SW", type: "switch" },
  { label: "VLAN_100", type: "switch" },
  { label: "VLAN_200", type: "switch" },
  { label: "EVPN_VXLAN", type: "router" },
  { label: "NGINX_INGRESS", type: "edge" },
] as const;

export function TopologyMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isOver: false });
  const [telemetry, setTelemetry] = useState({ nodes: 0, packets: 0, latency: "0.4ms" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let ripples: Ripple[] = [];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initNodes();
    };

    const initNodes = () => {
      const isMobile = width < 768;
      const count = isMobile ? 12 : 22;
      nodes = [];
      packets = [];

      for (let i = 0; i < count; i++) {
        const meta = NODE_LABELS[i % NODE_LABELS.length];
        nodes.push({
          x: Math.random() * (width - 100) + 50,
          y: Math.random() * (height - 100) + 50,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: meta.type === "router" ? 3.5 : meta.type === "database" ? 3 : 2.5,
          label: meta.label,
          type: meta.type,
          pulse: Math.random() * Math.PI * 2,
        });
      }

      setTelemetry(prev => ({ ...prev, nodes: count }));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isOver: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, isOver: false };
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Create a sonar packet ping ripple
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 180,
        opacity: 0.9,
      });

      // Broadcast instant packets to nearby nodes
      nodes.forEach((node, idx) => {
        const dx = node.x - clickX;
        const dy = node.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          packets.push({
            fromNode: -1, // -1 is cursor/click
            toNode: idx,
            progress: 0,
            speed: 0.035 + Math.random() * 0.02,
            color: "#ebcb00",
            size: 3,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    canvas.parentElement?.addEventListener("click", handleClick);

    // Periodic autonomous packet spawner
    let lastSpawn = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const primaryColor = "#ebcb00"; // Signature Gold Yellow
      const secondaryColor = isDark ? "#ebcb00" : "#2a7c13"; // Terminal Emerald / Gold
      const linkColor = isDark ? "rgba(235, 203, 0, 0.08)" : "rgba(42, 124, 19, 0.08)";
      const activeLinkColor = isDark ? "rgba(235, 203, 0, 0.28)" : "rgba(42, 124, 19, 0.25)";
      const nodeColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
      const labelColor = isDark ? "rgba(255, 255, 255, 0.22)" : "rgba(0, 0, 0, 0.25)";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMouseOver = mouseRef.current.isOver;

      // 1. Spawn Autonomous Packets along nearest neighbors
      if (time - lastSpawn > 220 && nodes.length > 1) {
        lastSpawn = time;
        const fromIdx = Math.floor(Math.random() * nodes.length);
        // Find a close neighbor
        const fromNode = nodes[fromIdx];
        let closestIdx = -1;
        let minDist = 240;

        for (let j = 0; j < nodes.length; j++) {
          if (j === fromIdx) continue;
          const dx = nodes[j].x - fromNode.x;
          const dy = nodes[j].y - fromNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = j;
          }
        }

        if (closestIdx !== -1 && packets.length < 35) {
          packets.push({
            fromNode: fromIdx,
            toNode: closestIdx,
            progress: 0,
            speed: 0.008 + Math.random() * 0.012,
            color: Math.random() > 0.35 ? primaryColor : secondaryColor,
            size: Math.random() > 0.6 ? 2.5 : 2,
          });
        }
      }

      // 2. Update and Draw Nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        // Bounce on boundary
        if (node.x < 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 30 || node.y > height - 30) node.vy *= -1;

        // Gentle cursor avoidance / attraction
        if (isMouseOver) {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 10) {
            // Soft repel
            const force = (120 - dist) / 120;
            node.x += (dx / dist) * force * 0.6;
            node.y += (dy / dist) * force * 0.6;
          }
        }

        // Draw node core
        const pulseSize = Math.sin(node.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, node.radius + pulseSize), 0, Math.PI * 2);
        ctx.fillStyle = node.type === "router" ? primaryColor : nodeColor;
        ctx.shadowColor = node.type === "router" ? primaryColor : "transparent";
        ctx.shadowBlur = node.type === "router" ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw micro label (only in large screens or on hover)
        if (width > 640) {
          ctx.font = "8px monospace";
          ctx.fillStyle = labelColor;
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      });

      // 3. Draw Network Links (Edges)
      const maxLinkDist = 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDist) {
            const alpha = 1 - dist / maxLinkDist;
            ctx.strokeStyle = linkColor;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Draw Interactive Links to Cursor Gateway
      if (isMouseOver) {
        nodes.forEach((node, idx) => {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 190) {
            ctx.strokeStyle = activeLinkColor;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
            ctx.setLineDash([]); // Reset line dash
          }
        });

        // Draw cursor Gateway Node
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "9px monospace";
        ctx.fillStyle = primaryColor;
        ctx.fillText("GW_INGRESS", mx + 10, my - 6);
      }

      // 5. Update and Draw Traveling Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;

        let startX = 0;
        let startY = 0;
        let targetX = 0;
        let targetY = 0;

        if (p.fromNode === -1) {
          startX = mx;
          startY = my;
        } else if (nodes[p.fromNode]) {
          startX = nodes[p.fromNode].x;
          startY = nodes[p.fromNode].y;
        }

        if (nodes[p.toNode]) {
          targetX = nodes[p.toNode].x;
          targetY = nodes[p.toNode].y;
        }

        const currX = startX + (targetX - startX) * p.progress;
        const currY = startY + (targetY - startY) * p.progress;

        // Draw packet beam / head
        ctx.beginPath();
        ctx.arc(currX, currY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.progress >= 1) {
          // Packet arrived -> create small arrival glow on target node
          if (nodes[p.toNode]) {
            nodes[p.toNode].pulse = Math.PI / 2; // trigger pulse bump
          }
          packets.splice(i, 1);
        }
      }

      // 6. Update and Draw Sonar Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.5;
        r.opacity = Math.max(0, 0.9 * (1 - r.radius / r.maxRadius));

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(235, 203, 0, ${r.opacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        if (r.radius >= r.maxRadius || r.opacity <= 0) {
          ripples.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      canvas.parentElement?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Subtle bottom telemetry HUD badge */}
      <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-2 font-mono text-[10px] text-zinc-500/70 dark:text-zinc-400/60 bg-background/80 dark:bg-[#030303]/80 px-2.5 py-1 rounded border border-zinc-200/50 dark:border-zinc-800/60 backdrop-blur-xs pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ebcb00] animate-ping" />
        <span>TOPOLOGY_FABRIC: MESH // CLICK_TO_PING // ~{telemetry.nodes} NODES</span>
      </div>
    </div>
  );
}
