import { useEffect, useRef, useState } from "react";

// ─── Heritage Vocabulary ──────────────────────────────────────────────────────
const SANSKRIT = ["ॐ", "सत्यम्", "ज्ञानम्", "परम्परा", "मूलम्"];
const TAMIL = ["மரபு", "வேர்", "அறிவு", "பாரம்பரியம்"];

interface TrailNode {
  el: HTMLSpanElement;
  createdAt: number;
  x: number;
  y: number;
  vy: number;
  rotation: number;
  lang: "sa" | "ta";
}

export default function HeritageCursor() {
  // Only hover label & hover state need React (they affect JSX)
  const [hoverLabel, setHoverLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  // All hot-path state lives in mutable refs – zero React re-renders on mousemove
  const mouse = useRef({ x: -300, y: -300 });
  const ring = useRef({ x: -300, y: -300 });
  const prev = useRef({ x: -300, y: -300 });
  const lastSpawn = useRef({ x: -300, y: -300 });
  const damruAngle = useRef(0);
  const trailNodes = useRef<TrailNode[]>([]);
  const counter = useRef(0);
  const rafId = useRef(0);
  const mounted = useRef(false);

  useEffect(() => {
    // ── Guards ────────────────────────────────────────────────────────────────
    if (mounted.current) return; // strict-mode / HMR safety
    mounted.current = true;

    const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;
    const coarsePointer = window.matchMedia("(any-pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Development diagnostic log as requested
    console.log("CustomCursor initialized", {
      finePointer: hasFinePointer,
      coarsePointer: coarsePointer,
      reducedMotion: reducedMotion,
    });

    // Disable ONLY if device has no fine pointer capability (pure touch-only device)
    if (!hasFinePointer) return;

    // Make cursor elements visible now that JS has confirmed fine pointer availability
    if (cursorRef.current) cursorRef.current.style.opacity = "1";
    if (ringRef.current) ringRef.current.style.opacity = "1";

    // ── Mouse move handler ───────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouse.current = { x, y };

      // 1. Base Damru Cursor snap (MUST ALWAYS WORK)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (cursorRef.current.style.opacity === "0") {
          cursorRef.current.style.opacity = "1";
        }
      }

      // 2. Interactive element detection (Optional enhancement - isolated fallback)
      try {
        const el = document.elementFromPoint(x, y);
        if (el) {
          const dataCursor = (el.closest("[data-cursor]") as HTMLElement | null)?.dataset.cursor;
          const isInteractive = !!el.closest("a,button,input,select,textarea,[role='button']");

          if (dataCursor) {
            setHoverLabel(dataCursor.toUpperCase());
            setIsHovered(true);
          } else if (isInteractive) {
            setHoverLabel("");
            setIsHovered(true);
          } else {
            setHoverLabel("");
            setIsHovered(false);
          }
        }
      } catch (_err) {
        // Isolated fallback: elementFromPoint failure won't stop base cursor
      }

      // 3. Heritage Trail Spawning (Optional enhancement - disabled on reducedMotion or failure)
      try {
        if (!reducedMotion && trailRef.current) {
          const dx = x - lastSpawn.current.x;
          const dy = y - lastSpawn.current.y;
          if (Math.hypot(dx, dy) > 32) {
            lastSpawn.current = { x, y };
            counter.current++;

            const isSa = counter.current % 2 === 1;
            const text = isSa
              ? SANSKRIT[Math.floor(Math.random() * SANSKRIT.length)]
              : TAMIL[Math.floor(Math.random() * TAMIL.length)];

            const span = document.createElement("span");
            span.textContent = text;

            // Inline critical styles – avoids class parsing overhead & uses complete transform
            Object.assign(span.style, {
              position: "absolute",
              left: "0",
              top: "0",
              pointerEvents: "none",
              userSelect: "none",
              fontSize: isSa ? "12px" : "11px",
              fontFamily: isSa
                ? "'Noto Serif Devanagari', serif"
                : "'Noto Serif Tamil', serif",
              letterSpacing: "0.08em",
              color: isSa ? "#c9a84c" : "#f0e8d6",
              textShadow: isSa
                ? "0 0 10px rgba(201,168,76,0.55)"
                : "0 0 10px rgba(240,232,214,0.45)",
              willChange: "transform, opacity",
              transform: `translate3d(${x}px, ${y - 8}px, 0) translate(-50%, -50%)`,
              opacity: "0.95",
            } as Partial<CSSStyleDeclaration>);

            trailRef.current.appendChild(span);

            trailNodes.current.push({
              el: span,
              createdAt: performance.now(),
              x,
              y: y - 8,
              vy: -(0.6 + Math.random() * 0.4),
              rotation: (Math.random() - 0.5) * 22,
              lang: isSa ? "sa" : "ta",
            });

            // Hard cap to keep performance buttery smooth
            if (trailNodes.current.length > 14) {
              const oldest = trailNodes.current.shift();
              oldest?.el.remove();
            }
          }
        }
      } catch (_err) {
        // Isolated fallback: trail spawning error won't stop base cursor
      }
    };

    // ── RAF animation loop ──────────────────────────────────────────────────
    const DURATION = 900;

    const loop = (now: number) => {
      // 1. Base Damru tilt animation (MUST ALWAYS WORK)
      try {
        const vx = mouse.current.x - prev.current.x;
        prev.current = { x: mouse.current.x, y: mouse.current.y };
        const targetAngle = Math.max(-28, Math.min(28, vx * 2));
        damruAngle.current += (targetAngle - damruAngle.current) * 0.18;

        const inner = cursorRef.current?.firstElementChild as HTMLElement | null;
        if (inner) inner.style.transform = `rotate(${damruAngle.current.toFixed(1)}deg)`;
      } catch (_err) {
        // Damru tilt fallback
      }

      // 2. Follower Ring Lerp (Optional enhancement)
      try {
        if (reducedMotion) {
          ring.current.x = mouse.current.x;
          ring.current.y = mouse.current.y;
        } else {
          const lr = 0.15;
          ring.current.x += (mouse.current.x - ring.current.x) * lr;
          ring.current.y += (mouse.current.y - ring.current.y) * lr;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
          if (ringRef.current.style.opacity === "0" && mouse.current.x > 0) {
            ringRef.current.style.opacity = "1";
          }
        }
      } catch (_err) {
        // Follower ring fallback
      }

      // 3. Animate + prune trail particles (Optional enhancement)
      try {
        let i = trailNodes.current.length;
        while (i--) {
          const p = trailNodes.current[i];
          const age = now - p.createdAt;
          if (age >= DURATION) {
            p.el.remove();
            trailNodes.current.splice(i, 1);
          } else {
            const t = age / DURATION; // 0→1
            const opacity = (1 - t) * 0.95;
            const ty = p.y + p.vy * age * 0.035;
            const scale = 1 - t * 0.18;
            p.el.style.transform = `translate3d(${p.x}px, ${ty}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${p.rotation}deg)`;
            p.el.style.opacity = opacity.toFixed(3);
          }
        }
      } catch (_err) {
        // Trail animation fallback
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      trailNodes.current.forEach((p) => p.el.remove());
      trailNodes.current = [];
      mounted.current = false;
    };
  }, []); // Empty deps: registers once for lifecycle of app

  return (
    <>
      {/* Heritage Trail Container – pure DOM children managed by RAF */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 2147483640,
          overflow: "hidden",
        }}
      />

      {/* Follower Ring Container */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 2147483646,
          willChange: "transform",
          display: "block",
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      >
        {hoverLabel ? (
          <div
            className="rounded-full border border-[#b87333] flex items-center justify-center px-3.5 py-1 backdrop-blur-md"
            style={{ background: "rgba(14,12,10,0.88)" }}
          >
            <span className="text-[10px] font-medium tracking-[0.25em] text-[#c9a84c]">
              {hoverLabel}
            </span>
          </div>
        ) : (
          <div
            style={{
              width: isHovered ? "40px" : "28px",
              height: isHovered ? "40px" : "28px",
              borderRadius: "9999px",
              border: isHovered ? "1px solid rgba(201,168,76,0.7)" : "1px solid rgba(184,115,51,0.3)",
              background: isHovered ? "rgba(184,115,51,0.1)" : "transparent",
              transition: "width 0.25s, height 0.25s, border-color 0.25s",
            }}
          />
        )}
      </div>

      {/* Base Damru Cursor Container – explicit fixed positioning & z-index */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 2147483647,
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      >
        {/* Inner wrapper receives tilt rotation from RAF */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* Glow halo */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(184,115,51,0.22)", filter: "blur(3px)" }}
          />
          {/* Damru SVG inline */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
            style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.85))" }}
          >
            <defs>
              <linearGradient id="damruGrad2" x1="5.5" y1="3.5" x2="18.5" y2="20.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#b87333" />
                <stop offset="50%" stopColor="#8c5324" />
                <stop offset="100%" stopColor="#c9a84c" />
              </linearGradient>
            </defs>
            <path d="M5.5 4.5 C5.5 3.5,18.5 3.5,18.5 4.5 L14 11.2 C13.3 11.8,10.7 11.8,10 11.2 Z" fill="url(#damruGrad2)" stroke="#b87333" strokeWidth="0.8" />
            <path d="M5.5 19.5 C5.5 20.5,18.5 20.5,18.5 19.5 L14 12.8 C13.3 12.2,10.7 12.2,10 12.8 Z" fill="url(#damruGrad2)" stroke="#b87333" strokeWidth="0.8" />
            <ellipse cx="12" cy="4.5" rx="6.5" ry="1.6" fill="#c9a84c" stroke="#b87333" strokeWidth="0.7" />
            <ellipse cx="12" cy="19.5" rx="6.5" ry="1.6" fill="#c9a84c" stroke="#b87333" strokeWidth="0.7" />
            <rect x="9.2" y="11.2" width="5.6" height="1.6" rx="0.8" fill="#f0e8d6" stroke="#8c5324" strokeWidth="0.4" />
            <path d="M9.5 12 C7.5 14,5.5 15.5,4 16.5" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="3.5" cy="17" r="1.2" fill="#f0e8d6" stroke="#b87333" strokeWidth="0.5" />
            <path d="M14.5 12 C16.5 14,18.5 15.5,20 16.5" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="20.5" cy="17" r="1.2" fill="#f0e8d6" stroke="#b87333" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </>
  );
}

