import { useEffect, useRef, useState } from "react";

// Indic Heritage Vocabulary
const SANSKRIT_FRAGMENTS = ["ॐ", "सत्यम्", "ज्ञानम्", "परम्परा", "मूलम्"];
const TAMIL_FRAGMENTS = ["மரபு", "வேர்", "அறிவு", "பாரம்பரியம்"];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  text: string;
  lang: "sa" | "ta";
  createdAt: number;
  rotation: number;
  vx: number;
  vy: number;
}

export default function HeritageCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  // High-frequency refs to avoid React re-render thrashing
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const lastPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const damruRotation = useRef(0);

  const trailItems = useRef<TrailItem[]>([]);
  const trailCounter = useRef(0);
  const lastSpawnPos = useRef({ x: -100, y: -100 });

  const rafId = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices or reduced motion preference
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      pos.current = { x, y };

      // Direct DOM update for instant cursor response without React state delays
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Check element under cursor for hover states / data-cursor attributes
      const target = document.elementFromPoint(x, y);
      if (target) {
        const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
        const interactive = target.closest("button, a, input, select, textarea, [role='button']");
        
        if (cursorEl?.dataset.cursor) {
          const type = cursorEl.dataset.cursor.toUpperCase();
          setHoverLabel(type);
          setIsHovered(true);
        } else if (interactive) {
          setHoverLabel("");
          setIsHovered(true);
        } else {
          setHoverLabel("");
          setIsHovered(false);
        }
      }

      // Spawn heritage text particle if mouse moved enough distance
      const dx = x - lastSpawnPos.current.x;
      const dy = y - lastSpawnPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 35 && !prefersReducedMotion) {
        lastSpawnPos.current = { x, y };
        trailCounter.current += 1;

        const isSanskrit = trailCounter.current % 2 === 1;
        const textArr = isSanskrit ? SANSKRIT_FRAGMENTS : TAMIL_FRAGMENTS;
        const text = textArr[Math.floor(Math.random() * textArr.length)];

        // Limit active trail length to 12 items for max performance
        if (trailItems.current.length > 12) {
          trailItems.current.shift();
        }

        trailItems.current.push({
          id: Date.now() + Math.random(),
          x,
          y: y - 10,
          text,
          lang: isSanskrit ? "sa" : "ta",
          createdAt: performance.now(),
          rotation: (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.6 - Math.random() * 0.4,
        });
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const renderLoop = (time: number) => {
      // Calculate velocity for dynamic Damru tilting
      const vx = pos.current.x - lastPos.current.x;
      const vy = pos.current.y - lastPos.current.y;
      velocity.current = { x: vx, y: vy };
      lastPos.current = { x: pos.current.x, y: pos.current.y };

      // Target damru tilt angle based on horizontal movement
      const targetAngle = Math.max(-25, Math.min(25, vx * 1.5));
      damruRotation.current += (targetAngle - damruRotation.current) * 0.15;

      // Smooth lerp follower ring
      const lerp = 0.15;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Update and render trail particles via direct DOM manipulation for 60fps
      if (trailContainerRef.current) {
        const activeItems: TrailItem[] = [];
        const container = trailContainerRef.current;
        const duration = 900; // ms

        // Clear previous trail children
        container.innerHTML = "";

        for (let i = 0; i < trailItems.current.length; i++) {
          const item = trailItems.current[i];
          const age = time - item.createdAt;

          if (age < duration) {
            activeItems.push(item);
            const progress = age / duration;
            const opacity = Math.max(0, 1 - progress);
            const scale = 1 - progress * 0.25;
            const currentX = item.x + item.vx * age * 0.05;
            const currentY = item.y + item.vy * age * 0.05;

            const span = document.createElement("span");
            span.className = `absolute pointer-events-none text-xs font-serif tracking-widest select-none transition-opacity ${
              item.lang === "sa"
                ? "text-[#c9a84c] [text-shadow:0_0_8px_rgba(201,168,76,0.4)] font-['Cinzel','Noto_Serif_Devanagari',serif]"
                : "text-[#f0e8d6] [text-shadow:0_0_8px_rgba(240,232,214,0.3)] font-['Noto_Serif_Tamil',serif]"
            }`;
            span.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale}) rotate(${item.rotation}deg)`;
            span.style.opacity = opacity.toFixed(2);
            span.style.fontSize = item.lang === "sa" ? "11px" : "10px";
            span.innerText = item.text;
            container.appendChild(span);
          }
        }
        trailItems.current = activeItems;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Linguistic Trail Container */}
      <div
        ref={trailContainerRef}
        className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden"
      />

      {/* Lagging Follower Ring / Interactive Label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{ willChange: "transform" }}
      >
        {hoverLabel ? (
          <div
            className="rounded-full border border-[#b87333]/80 flex items-center justify-center px-3.5 py-1 backdrop-blur-md shadow-lg shadow-[#b87333]/10"
            style={{ background: "rgba(14,12,10,0.85)" }}
          >
            <span className="text-[10px] font-medium tracking-[0.25em] text-[#c9a84c]">
              {hoverLabel}
            </span>
          </div>
        ) : (
          <div
            className={`rounded-full border transition-all duration-300 ${
              isHovered
                ? "w-10 h-10 border-[#c9a84c]/60 bg-[#b87333]/10 scale-110"
                : "w-7 h-7 border-[#b87333]/30"
            }`}
          />
        )}
      </div>

      {/* Precision Damru Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div
          className="relative w-6 h-6 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ transform: `rotate(${damruRotation.current}deg)` }}
        >
          {/* Subtle Damru aura glow */}
          <div className="absolute inset-0 rounded-full bg-[#b87333]/20 blur-[3px]" />

          {/* Shiva's Damru Vector Silhouette */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
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
