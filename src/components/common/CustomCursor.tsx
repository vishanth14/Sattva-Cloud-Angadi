import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Detect cursor type from data attributes
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const cursorEl = el.closest("[data-cursor]") as HTMLElement | null;
        const cursorType = cursorEl?.dataset.cursor || "";
        setLabel(cursorType === "view" ? "VIEW" : cursorType === "drag" ? "DRAG" : "");
      }
    };

    const animate = () => {
      const lerp = 0.12;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#b87333]" />
      </div>

      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        {label ? (
          <div
            className="rounded-full border border-[#b87333]/60 flex items-center justify-center px-3 py-1 backdrop-blur-sm"
            style={{ background: "rgba(14,12,10,0.7)" }}
          >
            <span className="text-[10px] font-medium tracking-widest text-[#b87333]">
              {label}
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full border border-[#b87333]/40" />
        )}
      </div>
    </>
  );
}
