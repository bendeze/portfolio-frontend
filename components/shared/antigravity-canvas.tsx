"use client";

import React, { useEffect, useRef } from "react";

interface NodeData {
  label: string;
  category: "dev" | "net";
  color: string;
  glow: string;
}

const TECH_NODES: NodeData[] = [
  // Software Development (dev)
  { label: "Python", category: "dev", color: "#3776AB", glow: "rgba(55, 118, 171, 0.4)" },
  { label: "Django", category: "dev", color: "#092E20", glow: "rgba(9, 46, 32, 0.4)" },
  { label: "TypeScript", category: "dev", color: "#3178C6", glow: "rgba(49, 120, 198, 0.4)" },
  { label: "Next.js", category: "dev", color: "#000000", glow: "rgba(255, 255, 255, 0.2)" },
  { label: "React", category: "dev", color: "#61DAFB", glow: "rgba(97, 218, 251, 0.4)" },
  { label: "FastAPI", category: "dev", color: "#059669", glow: "rgba(5, 150, 105, 0.4)" },
  { label: "PostgreSQL", category: "dev", color: "#4169E1", glow: "rgba(65, 105, 225, 0.4)" },
  { label: "Docker", category: "dev", color: "#2496ED", glow: "rgba(36, 150, 237, 0.4)" },
  
  // Network Engineering (net)
  { label: "Cisco IOS-XE", category: "net", color: "#1BA0D8", glow: "rgba(27, 160, 216, 0.4)" },
  { label: "BGP / OSPF", category: "net", color: "#F59E0B", glow: "rgba(245, 158, 11, 0.4)" },
  { label: "Juniper Junos", category: "net", color: "#3B82F6", glow: "rgba(59, 130, 246, 0.4)" },
  { label: "Wireshark", category: "net", color: "#1E3A8A", glow: "rgba(30, 58, 138, 0.4)" },
  { label: "IP Routing", category: "net", color: "#EC4899", glow: "rgba(236, 72, 153, 0.4)" },
  { label: "Ansible", category: "net", color: "#EE0000", glow: "rgba(238, 0, 0, 0.4)" },
  { label: "Linux (Debian)", category: "net", color: "#D70A53", glow: "rgba(215, 10, 83, 0.4)" },
];

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  label: string;
  color: string;
  glow: string;
  mass: number;
  opacity: number;
  targetOpacity: number;

  constructor(x: number, y: number, data: NodeData, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -0.2 - Math.random() * 0.3; // Upward drift
    this.label = data.label;
    this.color = data.color;
    this.glow = data.glow;
    this.mass = 1.2 + Math.random() * 0.8;
    this.opacity = 0;
    this.targetOpacity = 0.85;

    // Calculate approximate text bubble bounds based on string length
    ctx.font = "14px monospace";
    const textWidth = ctx.measureText(this.label).width;
    this.width = textWidth + 32; // padding
    this.height = 36; // standard pill height
  }

  update(mouseX: number, mouseY: number, isMouseNear: boolean, canvasWidth: number, canvasHeight: number) {
    // 1. Antigravity float up
    this.vy -= 0.002 * this.mass;

    // 2. Mouse Magnet Field (Google Antigravity interaction)
    if (isMouseNear) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 220) {
        // Magnetic pull vector
        const force = (220 - dist) / 220;
        this.vx += (dx / dist) * force * 0.12 * this.mass;
        this.vy += (dy / dist) * force * 0.12 * this.mass;
      }
    }

    // 3. Apply standard dampening (friction) to prevent runaway acceleration
    this.vx *= 0.96;
    this.vy *= 0.96;

    // 4. Update coordinates
    this.x += this.vx;
    this.y += this.vy;

    // 5. Fade-in on creation
    if (this.opacity < this.targetOpacity) {
      this.opacity += 0.02;
    }

    // 6. Loop boundaries (float past top edge -> spawn at bottom)
    if (this.y < -this.height) {
      this.y = canvasHeight + this.height + Math.random() * 50;
      this.x = Math.random() * canvasWidth;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -0.2 - Math.random() * 0.3;
      this.opacity = 0;
    }

    // Left/Right elastic boundary collisions
    const halfW = this.width / 2;
    if (this.x < halfW) {
      this.x = halfW;
      this.vx *= -0.5;
    } else if (this.x > canvasWidth - halfW) {
      this.x = canvasWidth - halfW;
      this.vx *= -0.5;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    // Soft bubble shadow glow
    ctx.shadowColor = this.glow;
    ctx.shadowBlur = 15;

    // Glassmorphism body layout (Antigravity capsule bubble)
    const rx = this.x - this.width / 2;
    const ry = this.y - this.height / 2;
    const r = this.height / 2;

    ctx.beginPath();
    ctx.roundRect(rx, ry, this.width, this.height, r);
    ctx.fillStyle = "rgba(18, 18, 20, 0.45)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();

    // Colored indicator dot
    ctx.shadowBlur = 0; // turn off blur for text/dot sharp rendering
    ctx.beginPath();
    ctx.arc(rx + 14, this.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Text Label
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "500 13px ui-monospace, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(this.label, rx + 24, this.y);

    ctx.restore();
  }
}

export function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isNear: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      // Match high pixel density Retina screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-initialize particles based on width
      const maxParticles = width < 768 ? 8 : 15; // degrade on mobile count-wise to lock 60fps
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        const node = TECH_NODES[i % TECH_NODES.length];
        const px = Math.random() * width;
        const py = Math.random() * height;
        particles.push(new Particle(px, py, node, ctx));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Track mouse events globally within Hero container bounds
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my, isNear: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isNear = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Perform separation step (particles push each other softly to avoid clipping overlaps)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (p1.width + p2.width) / 4 + 10; // soft spacing offset

          if (dist < minDist) {
            const overlap = minDist - dist;
            const forceX = (dx / dist) * overlap * 0.05;
            const forceY = (dy / dist) * overlap * 0.05;
            p1.vx -= forceX;
            p1.vy -= forceY;
            p2.vx += forceX;
            p2.vy += forceY;
          }
        }
      }

      // Update and draw particles
      const { x, y, isNear } = mouseRef.current;
      particles.forEach((p) => {
        p.update(x, y, isNear, width, height);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-80"
    />
  );
}
