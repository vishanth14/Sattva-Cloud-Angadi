import { useEffect, useRef } from "react";

export default function FluidCursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const blobPosRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const update = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const dx = posRef.current.x - blobPosRef.current.x;
      const dy = posRef.current.y - blobPosRef.current.y;
      
      velRef.current.x += dx * 0.08;
      velRef.current.y += dy * 0.08;
      
      velRef.current.x *= 0.85;
      velRef.current.y *= 0.85;
      
      blobPosRef.current.x += velRef.current.x;
      blobPosRef.current.y += velRef.current.y;

      const speed = Math.hypot(velRef.current.x, velRef.current.y);
      const scale = Math.min(1 + speed * 0.02, 1.5);
      const rotation = Math.atan2(velRef.current.y, velRef.current.x) * (180 / Math.PI);

      blob.style.transform = `translate3d(${blobPosRef.current.x}px, ${blobPosRef.current.y}px, 0) scale(${scale}) rotate(${rotation}deg)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", update, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", update);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2"
      style={{
        background: "radial-gradient(circle, rgba(184,115,51,0.15) 0%, rgba(201,168,76,0.08) 40%, transparent 70%)",
        filter: "blur(20px)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
