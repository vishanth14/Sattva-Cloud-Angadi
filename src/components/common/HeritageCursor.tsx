import { useEffect, useRef, useState } from "react";

// Heritage Vocabulary Fragments
const SANSKRIT_FRAGMENTS = ["ॐ", "सत्यम्", "ज्ञानम्", "परम्परा", "मूलम्"];
const TAMIL_FRAGMENTS = ["மரபு", "வேர்", "அறிவு", "பாரம்பரியம்"];

interface Particle {
  id: string;
  x: number;
  y: number;
  text: string;
  lang: "sa" | "ta";
  rotation: number;
  scale: number;
  opacity: number;
  createdAt: number;
}

export default function HeritageCursor() {
  const [isVisible, setIsVisible] = useState(true);
  const [hoverLabel, setHoverLabel] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Stable DOM Refs for high-performance positioning
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const lastPos = useRef({ x: -200, y: -200 });
  const lastSpawnPos = useRef({ x: -200, y: -200 });
  const damruRotation = useRef(0);
  const trailCounter = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      setIsVisible(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isVisible) setIsVisible(true);

      pos.current = { x, y };

      // Update cursor position directly via GPU translate3d
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Detect interactive elements under cursor
      const target = document.elementFromPoint(x, y);
      if (target) {
        const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
        const interactive = target.closest("button, a, input, select, textarea, [role='button']");

        if (cursorEl?.dataset.cursor) {
          setHoverLabel(cursorEl.dataset.cursor.toUpperCase());
          setIsHovered(true);
        } else if (interactive) {
          setHoverLabel("");
          setIsHovered(true);
        } else {
          setHoverLabel("");
          setIsHovered(false);
        }
      }

      // Check distance for spawning linguistic heritage trail
      const dx = x - lastSpawnPos.current.x;
      const dy = y - lastSpawnPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 30 && !prefersReducedMotion) {
        lastSpawnPos.current = { x, y };
        trailCounter.current += 1;

        const isSanskrit = trailCounter.current % 2 === 1;
        const textArray = isSanskrit ? SANSKRIT_FRAGMENTS : TAMIL_FRAGMENTS;
        const text = textArray[Math.floor(Math.random() * textArray.length)];

        const newParticle: Particle = {
          id: `${Date.now()}-${Math.random()}`,
          x,
          y: y - 8,
          text,
          lang: isSanskrit ? "sa" : "ta",
          rotation: (Math.random() - 0.5) * 24,
          scale: 1,
          opacity: 0.9,
          createdAt: performance.now(),
        };

        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // RAF Loop for smooth ring lerp & particle expiration cleanup
    const animate = (time: number) => {
      // Calculate horizontal velocity for Damru tilt
      const vx = pos.current.x - lastPos.current.x;
      lastPos.current = { x: pos.current.x, y: pos.current.y };

      const targetAngle = Math.max(-28, Math.min(28, vx * 1.8));
      damruRotation.current += (targetAngle - damruRotation.current) * 0.18;

      // Lerp follower ring
      const lerp = 0.16;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Filter expired particles (duration 950ms)
      setParticles((prev) => {
        const filtered = prev.filter((p) => time - p.createdAt < 950);
        if (filtered.length === prev.length) return prev;
        return filtered;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <>
      {/* Linguistic Trail Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {particles.map((p) => {
          const age = performance.now() - p.createdAt;
          const progress = Math.min(1, age / 950);
          const opacity = (1 - progress) * 0.95;
          const translateY = -progress * 16;
          const scale = 1 - progress * 0.2;

          return (
            <span
              key={p.id}
              className={`absolute pointer-events-none text-xs tracking-widest select-none transition-all ${
                p.lang === "sa"
                  ? "text-[#c9a84c] [text-shadow:0_0_10px_rgba(201,168,76,0.5)] font-['Noto_Serif_Devanagari','Cinzel',serif]"
                  : "text-[#f0e8d6] [text-shadow:0_0_10px_rgba(240,232,214,0.4)] font-['Noto_Serif_Tamil',serif]"
              }`}
              style={{
                transform: `translate3d(${p.x}px, ${p.y + translateY}px, 0) scale(${scale}) rotate(${p.rotation}deg)`,
                opacity,
                fontSize: p.lang === "sa" ? "12px" : "11px",
                willChange: "transform, opacity",
              }}
            >
              {p.text}
            </span>
          );
        })}
      </div>

      {/* Lagging Follower Ring / Interactive Label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0, willChange: "transform" }}
      >
        {hoverLabel ? (
          <div
            className="rounded-full border border-[#b87333] flex items-center justify-center px-3.5 py-1 backdrop-blur-md shadow-lg shadow-[#b87333]/20"
            style={{ background: "rgba(14,12,10,0.88)" }}
          >
            <span className="text-[10px] font-medium tracking-[0.25em] text-[#c9a84c]">
              {hoverLabel}
            </span>
          </div>
        ) : (
          <div
            className={`rounded-full border transition-all duration-300 ${
              isHovered
                ? "w-10 h-10 border-[#c9a84c]/80 bg-[#b87333]/15 scale-110"
                : "w-7 h-7 border-[#b87333]/35"
            }`}
          />
        )}
      </div>

      {/* Damru Vector Silhouette Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0, willChange: "transform" }}
      >
        <div
          className="relative w-6 h-6 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ transform: `rotate(${damruRotation.current}deg)` }}
        >
          {/* Subtle Damru glow */}
          <div className="absolute inset-0 rounded-full bg-[#b87333]/25 blur-[3px]" />

          {/* Shiva's Damru Vector Silhouette */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
          >
            {/* Top drum body cone */}
            <path
              d="M5.5 4.5 C5.5 3.5, 18.5 3.5, 18.5 4.5 L14 11.2 C13.3 11.8, 10.7 11.8, 10 11.2 Z"
              fill="url(#damruGrad)"
              stroke="#b87333"
              strokeWidth="0.8"
            />

            {/* Bottom drum body cone */}
            <path
              d="M5.5 19.5 C5.5 20.5, 18.5 20.5, 18.5 19.5 L14 12.8 C13.3 12.2, 10.7 12.2, 10 12.8 Z"
              fill="url(#damruGrad)"
              stroke="#b87333"
              strokeWidth="0.8"
            />

            {/* Top drum head rim */}
            <ellipse
              cx="12"
              cy="4.5"
              rx="6.5"
              ry="1.6"
              fill="#c9a84c"
              stroke="#b87333"
              strokeWidth="0.7"
            />

            {/* Bottom drum head rim */}
            <ellipse
              cx="12"
              cy="19.5"
              rx="6.5"
              ry="1.6"
              fill="#c9a84c"
              stroke="#b87333"
              strokeWidth="0.7"
            />

            {/* Central waist binding cord */}
            <rect x="9.2" y="11.2" width="5.6" height="1.6" rx="0.8" fill="#f0e8d6" stroke="#8c5324" strokeWidth="0.4" />

            {/* Hanging striker cords & beads */}
            <path d="M9.5 12 C7.5 14, 5.5 15.5, 4 16.5" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="3.5" cy="17" r="1.2" fill="#f0e8d6" stroke="#b87333" strokeWidth="0.5" />

            <path d="M14.5 12 C16.5 14, 18.5 15.5, 20 16.5" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="20.5" cy="17" r="1.2" fill="#f0e8d6" stroke="#b87333" strokeWidth="0.5" />

            <defs>
              <linearGradient id="damruGrad" x1="5.5" y1="3.5" x2="18.5" y2="20.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#b87333" />
                <stop offset="50%" stopColor="#8c5324" />
                <stop offset="100%" stopColor="#c9a84c" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
