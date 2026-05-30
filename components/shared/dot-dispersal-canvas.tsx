"use client";

import React, { useEffect, useRef } from "react";

interface DotDispersalCanvasProps {
  spacing?: number;
  dispersalRadius?: number;
  maxDisplacement?: number;
}

export function DotDispersalCanvas({
  spacing = 16,
  dispersalRadius = 400,
  maxDisplacement = 10
}: DotDispersalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const SPACING = spacing;
    const DISPERSAL_RADIUS = dispersalRadius;
    const MAX_DISPLACEMENT = maxDisplacement;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      // Detect dark mode status
      const isDark = document.documentElement.classList.contains("dark");
      // Exactly match the user's radial gradient colors: #d4d4d4 in light, #404040 in dark
      ctx.fillStyle = isDark ? "#404040" : "#1d1c1c43"; 

      const cx = width / 2;
      const cy = height / 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x0 = c * SPACING;
          const y0 = r * SPACING;

          // Replicate exact CSS elliptical mask: 
          // [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]
          const dxCenter = (x0 - cx) / (width / 2);
          const dyCenter = (y0 - cy) / (height / 2);
          const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

          let maskOpacity = 0;
          if (distCenter <= 0.7) {
            maskOpacity = 1;
          } else if (distCenter < 1.0) {
            // Smooth linear interpolation from 0.7 to 1.0
            maskOpacity = 1 - (distCenter - 0.7) / 0.3;
          }

          if (maskOpacity <= 0) continue;

          // Calculate displacement from mouse
          const dxMouse = x0 - mx;
          const dyMouse = y0 - my;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          let rx = x0;
          let ry = y0;
          let itemOpacity = maskOpacity;

          if (distMouse < DISPERSAL_RADIUS) {
            // Strong quadratic-like curve for smooth, soft force dispersal pushes
            const force = (DISPERSAL_RADIUS - distMouse) / DISPERSAL_RADIUS;
            const angle = Math.atan2(dyMouse, dxMouse);
            const displacement = force * force * MAX_DISPLACEMENT;

            rx += Math.cos(angle) * displacement;
            ry += Math.sin(angle) * displacement;

            // Fade slightly near cursor to enhance the separation bubble feel
            itemOpacity *= Math.max(0.1, distMouse / DISPERSAL_RADIUS);
          }

          ctx.beginPath();
          ctx.arc(rx, ry, 1, 0, Math.PI * 2);
          ctx.save();
          ctx.globalAlpha = itemOpacity;
          ctx.fill();
          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spacing, dispersalRadius, maxDisplacement]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
