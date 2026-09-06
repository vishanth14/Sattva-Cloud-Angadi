import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(Math.floor((width * height) / 12000), 80);
    const colors = ["#b87333", "#c9a84c", "#f0e8d6", "#8c5324"];
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "rgba(14, 12, 10, 0.1)";
    ctx.fillRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      p.pulse += p.pulseSpeed;
      const pulseRadius = p.radius + Math.sin(p.pulse) * 0.5;
      
      const dxMouse = mouse.x - p.x;
      const dyMouse = mouse.y - p.y;
      const distMouse = Math.hypot(dxMouse, dyMouse);
      
      if (distMouse < 150) {
        const force = (150 - distMouse) / 150;
        p.vx -= (dxMouse / distMouse) * force * 0.3;
        p.vy -= (dyMouse / distMouse) * force * 0.3;
      }

      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseRadius * 3);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(184, 115, 51, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      if (distMouse < 150) {
        const opacity = (1 - distMouse / 150) * 0.6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(201, 168, 76, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    animationRef.current = requestAnimationFrame(() => draw(ctx, width, height));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouse);
    animationRef.current = requestAnimationFrame(() => draw(ctx, canvas.width, canvas.height));

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
