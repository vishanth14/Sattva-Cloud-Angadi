import { useEffect, useRef, useState } from "react";

interface InteractiveImageMaskProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export default function InteractiveImageMask({ imageUrl, alt = "", className = "" }: InteractiveImageMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rafId: number;
    let targetReveal = 0;

    const animate = () => {
      setReveal((prev) => {
        const diff = targetReveal - prev;
        return prev + diff * 0.08;
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
      targetReveal = 1;
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      targetReveal = 0;
      setIsHovering(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const revealClamped = Math.max(0, Math.min(100, reveal * 100));

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-none ${className}`}
      style={{ background: "#0e0c0a" }}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.4) saturate(0.6)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, rgba(184,115,51,0.9) 0%, transparent 100%)`,
          opacity: revealClamped / 100,
          mixBlendMode: "overlay",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          maskImage: `radial-gradient(circle ${60 + revealClamped * 0.4}px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${60 + revealClamped * 0.4}px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
        }}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(1.2) saturate(1.4)",
            transform: `scale(${1 + revealClamped * 0.002})`,
          }}
        />
      </div>

      {isHovering && (
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-[#c9a84c] pointer-events-none z-10"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 20px rgba(201, 168, 76, 0.5)",
          }}
        />
      )}
    </div>
  );
}
