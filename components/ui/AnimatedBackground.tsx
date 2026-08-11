"use client";

import React, { useEffect, useRef } from "react";
import { useMode } from "../../context/ModeContext";
import { useTheme } from "../../context/ThemeContext";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const { mode } = useMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }[] = [];

    const numParticles = Math.min(20, Math.floor(width / 60));
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100 + 60,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.08 + 0.02,
      });
    }

    const getColors = () => {
      if (theme === "cyberpunk") {
        return { c1: "rgba(34, 211, 238, ", c2: "rgba(168, 85, 247, " };
      }
      if (theme === "emerald") {
        return { c1: "rgba(52, 211, 153, ", c2: "rgba(16, 185, 129, " };
      }
      if (theme === "midnight") {
        return { c1: "rgba(251, 191, 36, ", c2: "rgba(239, 68, 68, " };
      }
      if (theme === "light") {
        return { c1: "rgba(14, 165, 233, ", c2: "rgba(16, 185, 129, " };
      }
      return { c1: "rgba(56, 189, 248, ", c2: "rgba(16, 185, 129, " };
    };

    let tick = 0;
    const render = () => {
      tick += 0.003;
      ctx.clearRect(0, 0, width, height);

      const colors = getColors();

      // Subtle geometric grid
      const gridSize = 80;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Soft ambient light orbs
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const baseColor = idx % 2 === 0 ? colors.c1 : colors.c2;
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        const pulseAlpha = p.alpha + Math.sin(tick + idx) * 0.02;
        grad.addColorStop(0, `${baseColor}${Math.max(0, pulseAlpha)})`);
        grad.addColorStop(1, `${baseColor}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-700"
    />
  );
}
