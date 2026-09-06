import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getProduct, products } from "../data/products";
import { getMaterial } from "../data/materials";
import { getCareGuide } from "../data/careGuides";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function HeritagePassport({ product }: { product: ReturnType<typeof getProduct> }) {
  const [open, setOpen] = useState(false);

  if (!product) return null;
  const material = getMaterial(product.materialSlug);

  const GRAIN =
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139,108,69,0.02) 3px, rgba(139,108,69,0.02) 4px), " +
    "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(139,108,69,0.012) 4px, rgba(139,108,69,0.012) 5px)";

  const lbl = (t: string) => (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "7px", letterSpacing: "0.38em", color: "#8b5e34", textTransform: "uppercase", marginBottom: "8px" }}>{t}</p>
  );
  const val = (t: string, size = "17px", italic = false) => (
    <p style={{ fontFamily: "'Fraunces', serif", fontSize: size, color: "#160a02", fontWeight: 400, fontStyle: italic ? "italic" : "normal", lineHeight: 1.25 }}>{t}</p>
  );

  return (
    <>
      {/* ── Trigger button (identical to original) ── */}
      <button
        onClick={() => setOpen(true)}
        className="w-full py-4 border flex items-center justify-between px-6 transition-all duration-300 hover:border-[#b87333] group"
        style={{ borderColor: "#2e2820" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-[#b87333] flex items-center justify-center">
            <span className="text-[10px] text-[#b87333]">HP</span>
          </div>
          <div className="text-left">
            <p className="text-xs tracking-[0.2em] text-[#f0e8d6]">HERITAGE PASSPORT</p>
            <p className="text-[10px] text-[#7a6a58]">Digital provenance document</p>
          </div>
        </div>
        <span className="text-[#b87333] text-sm group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,8,6,0.95)", padding: "24px" }}
          onClick={() => setOpen(false)}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            aria-label="Close Heritage Passport"
            className="absolute top-6 right-8 z-10 transition-opacity hover:opacity-100"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.35em", color: "#b87333", opacity: 0.65, background: "none", border: "none" }}
          >
            ✕ CLOSE
          </button>

          {/* ══ THE MANUSCRIPT — full viewport, 2D grid, no scroll ══ */}
          <div
            style={{
              width: "min(96vw, 1100px)",
              height: "min(90vh, 740px)",
              background: "linear-gradient(135deg, #f0e6ce 0%, #ede2c8 18%, #f5edda 44%, #ede0c4 70%, #f2e8d0 100%)",
              position: "relative",
              boxShadow: "0 40px 120px rgba(0,0,0,0.9), 0 8px 40px rgba(0,0,0,0.6), inset 0 0 200px rgba(139,108,69,0.07)",
              transform: "perspective(1600px) rotateX(0.8deg)",
              transformOrigin: "center center",
              /* Deckled / imperfect edges on all four sides */
              clipPath: "polygon(0% 0.8%, 12% 0%, 25% 0.6%, 38% 0%, 52% 0.5%, 66% 0%, 80% 0.4%, 93% 0%, 100% 0.7%, 99.6% 14%, 100% 30%, 99.5% 50%, 100% 70%, 99.4% 88%, 100% 99.2%, 88% 100%, 75% 99.4%, 62% 100%, 48% 99.5%, 35% 100%, 22% 99.4%, 9% 100%, 0.4% 99.2%, 0% 85%, 0.5% 68%, 0% 50%, 0.4% 32%, 0% 15%)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Paper fiber texture */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, backgroundImage: GRAIN }} />
            {/* Edge-heavy aging vignette */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, background: "radial-gradient(ellipse at 50% 50%, transparent 32%, rgba(100,72,36,0.18) 100%)" }} />
            {/* Stain 1 */}
            <div style={{ position: "absolute", top: "38%", left: "32%", width: "280px", height: "170px", background: "radial-gradient(ellipse, rgba(160,100,40,0.048) 0%, transparent 65%)", pointerEvents: "none", zIndex: 2, transform: "rotate(-9deg)" }} />
            {/* Stain 2 */}
            <div style={{ position: "absolute", bottom: "20%", right: "22%", width: "200px", height: "130px", background: "radial-gradient(ellipse, rgba(140,90,30,0.038) 0%, transparent 70%)", pointerEvents: "none", zIndex: 2, transform: "rotate(7deg)" }} />
            {/* Stain 3 — top-left corner age */}
            <div style={{ position: "absolute", top: "0", left: "0", width: "240px", height: "160px", background: "radial-gradient(ellipse at 10% 10%, rgba(130,85,30,0.055) 0%, transparent 70%)", pointerEvents: "none", zIndex: 2 }} />
            {/* Faint SATTVA watermark */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-5deg)", fontFamily: "'Cinzel', serif", fontSize: "clamp(100px, 14vw, 160px)", fontWeight: 700, color: "rgba(139,108,69,0.038)", pointerEvents: "none", zIndex: 2, letterSpacing: "0.08em", userSelect: "none", whiteSpace: "nowrap" }}>
              SATTVA
            </div>

            {/* ── CONTENT GRID ── */}
            <div style={{ position: "relative", zIndex: 3, flex: 1, display: "grid", gridTemplateColumns: "38% 1fr 1fr", gridTemplateRows: "auto 1fr auto", padding: "44px 56px 32px 64px", gap: "0" }}>

              {/* TOP-LEFT: Intro header — spans col 1, rows 1–2 */}
              <div style={{ gridColumn: "1", gridRow: "1 / 3", paddingRight: "44px", borderRight: "1px solid rgba(139,94,52,0.2)", display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "24px" }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "7.5px", letterSpacing: "0.45em", color: "#8b5e34", marginBottom: "8px" }}>SATTVA CLOUD ANGADI</p>
                <div style={{ width: "44px", height: "1px", background: "linear-gradient(to right, #8b5e34, transparent)", marginBottom: "18px" }} />
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "8.5px", letterSpacing: "0.28em", color: "#6b4a28", marginBottom: "28px" }}>HERITAGE PASSPORT</p>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(22px,3vw,34px)", color: "#1e0e04", lineHeight: 1.1, fontWeight: 400, marginBottom: "18px", fontStyle: "italic" }}>{product.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "9px", color: "#8b5e34" }}>✦</span>
                  <div style={{ height: "1px", width: "48px", background: "rgba(139,94,52,0.3)" }} />
                  <span style={{ fontSize: "9px", color: "#8b5e34" }}>✦</span>
                </div>
                <p style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: "12px", color: "rgba(107,74,40,0.38)", letterSpacing: "0.04em", lineHeight: 1.5, marginBottom: "28px" }}>सत्त्व क्लाउड अङ्गडि</p>
                {/* Archival seal */}
                <div style={{ width: "90px", height: "90px", borderRadius: "50%", border: "1.5px solid rgba(139,94,52,0.35)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", transform: "rotate(-3deg)" }}>
                  <div style={{ position: "absolute", inset: "4px", borderRadius: "50%", border: "0.5px solid rgba(139,94,52,0.16)" }} />
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "6.5px", letterSpacing: "0.18em", color: "#8b5e34", lineHeight: 1.9, textAlign: "center" }}>SATTVA<br />ANGADI<br /><span style={{ fontSize: "9px" }}>✦</span></p>
                </div>
              </div>

              {/* TOP-MIDDLE: Object + Material */}
              <div style={{ gridColumn: "2", gridRow: "1", padding: "0 32px 28px 44px", borderRight: "1px solid rgba(139,94,52,0.12)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "24px" }}>
                <div>
                  {lbl("Object")}
                  {val(product.name, "20px", true)}
                </div>
                <div>
                  {lbl("Material")}
                  {val(product.material, "20px", true)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", transform: "rotate(-0.3deg)", marginTop: "4px" }}>
                  <div style={{ height: "1px", flex: 1, background: "rgba(139,94,52,0.2)" }} />
                  <span style={{ fontSize: "7px", color: "rgba(139,94,52,0.45)" }}>◆</span>
                </div>
              </div>

              {/* TOP-RIGHT: Region + Provenance + Tradition */}
              <div style={{ gridColumn: "3", gridRow: "1", padding: "0 0 28px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "22px" }}>
                <div>
                  {lbl("Region")}
                  {val(product.region, "18px", true)}
                </div>
                <div>
                  {lbl("Provenance")}
                  {val(material?.region || product.region, "16px")}
                </div>
                <div>
                  {lbl("Craft Tradition")}
                  {val(product.artisanCommunity, "14px")}
                </div>
              </div>

              {/* MIDDLE: Craft Process — spans cols 2–3 */}
              <div style={{ gridColumn: "2 / 4", gridRow: "2", padding: "0 0 0 44px", borderTop: "1px solid rgba(139,94,52,0.12)", paddingTop: "22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "7px", letterSpacing: "0.38em", color: "#8b5e34", textTransform: "uppercase", marginBottom: "14px" }}>Craft Process</p>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "14px", color: "#1e0a02", lineHeight: 1.85, fontWeight: 300, fontStyle: "italic" }}>{product.craftProcess}</p>
                <div style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "8px", transform: "rotate(0.2deg)" }}>
                  <div style={{ height: "1px", width: "16px", background: "rgba(139,94,52,0.28)" }} />
                  <span style={{ fontSize: "8px", color: "#8b5e34" }}>✦</span>
                  <div style={{ height: "1px", flex: 1, background: "rgba(139,94,52,0.15)" }} />
                </div>
              </div>

              {/* BOTTOM: Traditional Use + Care + Devanagari colophon — spans all cols */}
              <div style={{ gridColumn: "1 / 4", gridRow: "3", borderTop: "1px solid rgba(139,94,52,0.12)", paddingTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0", alignItems: "start" }}>
                <div style={{ paddingRight: "40px" }}>
                  {lbl("Traditional Use")}
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: "13px", color: "#1e0a02", lineHeight: 1.75, fontWeight: 300 }}>{product.traditionalUse.split(".")[0] + "."}</p>
                </div>
                <div style={{ paddingLeft: "40px", borderLeft: "1px solid rgba(139,94,52,0.12)" }}>
                  {lbl("Care")}
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: "13px", color: "#3a1e08", lineHeight: 1.75, fontStyle: "italic", fontWeight: 300 }}>{"See care guide for complete maintenance instructions for " + product.material.toLowerCase() + "."}</p>
                </div>
                <div style={{ paddingLeft: "40px", textAlign: "right" }}>
                  <p style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: "10px", color: "rgba(107,74,40,0.28)", lineHeight: 1.6 }}>विरासत<br />प्रमाण पत्र</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "6px", letterSpacing: "0.4em", color: "rgba(107,74,40,0.45)", marginTop: "8px" }}>ARCHIVAL RECORD</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}


// ── Care Guide flip-book page content ──
// pageIndex drives per-page worn/torn visual variation
function PageContent({
  section,
  romanNumeral,
  pageIndex,
}: {
  section: { heading: string; items: string[] };
  romanNumeral: string;
  pageIndex: number;
}) {
  // Subtle per-page background tone shift — each sheet feels slightly different
  const toneTints = [
    "rgba(160,110,50,0.022)",
    "rgba(130,90,40,0.016)",
    "rgba(150,100,45,0.028)",
    "rgba(120,85,35,0.018)",
    "rgba(140,95,42,0.024)",
  ];
  // Heavier stain positions per page
  const stains = [
    { top: "18%", left: "62%", w: "140px", h: "90px", r: "-14deg", o: 0.055 },
    { top: "55%", left: "14%", w: "110px", h: "70px", r: "8deg", o: 0.045 },
    { top: "28%", left: "70%", w: "130px", h: "80px", r: "-6deg", o: 0.06 },
    { top: "65%", left: "50%", w: "150px", h: "95px", r: "11deg", o: 0.04 },
    { top: "22%", left: "30%", w: "120px", h: "75px", r: "-9deg", o: 0.05 },
  ];
  const s = stains[pageIndex] || stains[0];
  const tint = toneTints[pageIndex] || toneTints[0];

  return (
    <div style={{ position: "relative", padding: "44px 48px", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Per-page warm tint overlay */}
      <div style={{ position: "absolute", inset: 0, background: tint, pointerEvents: "none" }} />
      {/* Per-page stain mark */}
      <div style={{ position: "absolute", top: s.top, left: s.left, width: s.w, height: s.h, background: `radial-gradient(ellipse, rgba(155,95,38,${s.o}) 0%, transparent 70%)`, pointerEvents: "none", transform: `rotate(${s.r})` }} />
      {/* Worn corner fold — bottom-right */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "32px", height: "32px", background: "linear-gradient(225deg, rgba(120,80,30,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
      {/* Ornamental top rule */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
        <span style={{ fontSize: "7px", color: "#8b5e34", opacity: 0.55 }}>✦</span>
        <div style={{ height: "1px", flex: 1, background: "rgba(139,94,52,0.18)" }} />
        <span style={{ fontSize: "7px", color: "#8b5e34", opacity: 0.55 }}>✦</span>
      </div>
      {/* Section heading */}
      <p style={{ position: "relative", fontFamily: "'DM Sans', sans-serif", fontSize: "7.5px", letterSpacing: "0.4em", color: "#8b5e34", textTransform: "uppercase", marginBottom: "14px" }}>
        {section.heading}
      </p>
      <div style={{ position: "relative", height: "1px", width: "44px", background: "rgba(139,94,52,0.28)", marginBottom: "24px", transform: "rotate(-0.4deg)" }} />
      {/* Manuscript prose content */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", gap: "13px", overflow: "hidden" }}>
        {section.items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: "14px", color: "#8b5e34", lineHeight: 1.5, flexShrink: 0 }}>—</span>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: "12.5px", color: "#1e0a02", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{item}</p>
          </div>
        ))}
      </div>
      {/* Page footer with roman numeral */}
      <div style={{ position: "relative", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ height: "1px", width: "32px", background: "rgba(139,94,52,0.18)" }} />
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "7px", letterSpacing: "0.3em", color: "rgba(139,94,52,0.45)" }}>{romanNumeral}</p>
      </div>
    </div>
  );
}

function CareModal({ materialSlug, productName: _productName }: { materialSlug: string; productName: string }) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [exitingPage, setExitingPage] = useState<number | null>(null);
  const [flipDir, setFlipDir] = useState<"forward" | "back">("forward");
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref holds fresh state to avoid stale closures in event handlers
  const stateRef = useRef({ currentPage: 0, exitingPage: null as number | null, totalPages: 5 });
  const touchStartYRef = useRef<number | null>(null);

  const guide = getCareGuide(materialSlug);
  const sections = guide
    ? [
        { heading: "HOW TO USE", items: guide.howToUse },
        { heading: "HOW TO CLEAN", items: guide.howToClean },
        { heading: "HOW TO STORE", items: guide.howToStore },
        { heading: "WHAT TO AVOID", items: guide.whatToAvoid },
        { heading: "MAINTENANCE", items: guide.maintenance },
      ]
    : [];
  const totalPages = sections.length;

  // Keep ref in sync with latest state on every render
  stateRef.current = { currentPage, exitingPage, totalPages };

  // Reads from stateRef to avoid stale closure in wheel / button handlers
  const doFlip = (dir: "forward" | "back") => {
    const { currentPage: cp, exitingPage: ep, totalPages: tp } = stateRef.current;
    if (ep !== null) return; // already animating
    if (dir === "forward" && cp >= tp - 1) return;
    if (dir === "back" && cp <= 0) return;
    setExitingPage(cp);
    setFlipDir(dir);
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    flipTimerRef.current = setTimeout(() => {
      setCurrentPage((p) => p + (dir === "forward" ? 1 : -1));
      setExitingPage(null);
    }, 520);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (flipTimerRef.current) clearTimeout(flipTimerRef.current); };
  }, []);

  // Wheel → flip pages
  useEffect(() => {
    if (!open) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 40) return;
      doFlip(e.deltaY > 0 ? "forward" : "back");
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [open]);

  const handleOpen = () => {
    setCurrentPage(0);
    setExitingPage(null);
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    setOpen(true);
  };

  if (!guide) return null;

  const ROMAN = ["I", "II", "III", "IV", "V"];
  const PARCHMENT = "linear-gradient(135deg, #f0e6ce 0%, #ede2c8 22%, #f5edda 46%, #ede0c4 72%, #f2e8d0 100%)";
  const GRAIN =
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139,108,69,0.025) 3px, rgba(139,108,69,0.025) 4px), " +
    "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(139,108,69,0.015) 4px, rgba(139,108,69,0.015) 5px)";
  // 5 distinct torn/deckled edge polygons — one per page
  const TORN_CLIPS = [
    // Page 0 — torn bottom-right corner, rough left side
    "polygon(0.8% 0.4%, 18% 0%, 36% 0.7%, 55% 0%, 74% 0.5%, 91% 0%, 99.2% 0.8%, 100% 14%, 99.4% 31%, 100% 52%, 99.6% 71%, 100% 88%, 98.5% 91%, 100% 94%, 97% 97%, 99% 100%, 91% 97%, 86% 100%, 80% 96%, 74% 99%, 68% 95%, 62% 98%, 56% 94%, 49% 97%, 43% 93%, 37% 96%, 30% 93%, 24% 97%, 18% 93%, 12% 97%, 6% 94%, 1% 99%, 0% 94%, 0.6% 78%, 0% 60%, 0.5% 42%, 0% 24%, 0.7% 8%)",
    // Page 1 — torn bottom, notched top-right
    "polygon(0.5% 0.6%, 22% 0%, 41% 0.8%, 60% 0.2%, 78% 0.9%, 93% 0%, 99% 0.5%, 99.6% 2%, 100% 3.5%, 98.5% 4%, 100% 5.5%, 99.3% 18%, 100% 38%, 99.5% 58%, 100% 78%, 99.3% 96%, 100% 99%, 93% 97%, 88% 100%, 82% 96%, 76% 99%, 70% 95%, 64% 98%, 58% 94%, 52% 97%, 46% 93%, 40% 96%, 34% 92%, 28% 96%, 22% 92%, 16% 96%, 10% 93%, 4% 97%, 0.4% 99%, 0% 82%, 0.5% 62%, 0% 44%, 0.4% 25%, 0% 8%)",
    // Page 2 — heavily torn bottom, slight fold top-left
    "polygon(1.2% 1.5%, 3% 0.4%, 1.5% 0%, 20% 0.6%, 40% 0%, 59% 0.7%, 78% 0%, 96% 0.5%, 100% 0.8%, 99.5% 20%, 100% 40%, 99.4% 60%, 100% 80%, 99.6% 98%, 100% 100%, 91% 96%, 86% 100%, 80% 95%, 74% 99%, 67% 94%, 61% 98%, 55% 93%, 48% 97%, 42% 92%, 35% 96%, 29% 91%, 22% 95%, 15% 91%, 9% 95%, 3% 99%, 0% 97%, 0.6% 80%, 0% 62%, 0.5% 44%, 0% 26%, 0.6% 10%)",
    // Page 3 — rough all-around deckled edges
    "polygon(0.6% 1%, 4% 0%, 2% 1.5%, 16% 0.3%, 34% 1%, 52% 0.2%, 70% 0.8%, 88% 0.1%, 99% 0.7%, 100% 0.9%, 99.4% 16%, 100% 34%, 99.3% 52%, 100% 70%, 99.5% 88%, 100% 98%, 97% 100%, 90% 97%, 84% 100%, 78% 96%, 71% 99%, 65% 95%, 58% 98%, 52% 94%, 45% 98%, 39% 94%, 32% 97%, 26% 93%, 19% 97%, 13% 93%, 7% 97%, 1% 100%, 0% 96%, 0.5% 80%, 0% 63%, 0.6% 46%, 0% 29%, 0.5% 13%)",
    // Page 4 — torn bottom-left, frayed right edge
    "polygon(0.7% 0.5%, 20% 0%, 38% 0.6%, 57% 0%, 75% 0.5%, 93% 0%, 99.5% 0.7%, 100% 8%, 99.2% 16%, 100% 26%, 98.8% 36%, 100% 48%, 99.3% 60%, 100% 72%, 99.1% 84%, 100% 96%, 99% 100%, 90% 97%, 84% 100%, 78% 96%, 71% 99%, 65% 95%, 59% 98%, 53% 94%, 46% 97%, 40% 93%, 33% 97%, 27% 93%, 20% 96%, 13% 92%, 7% 96%, 1.5% 99%, 0% 100%, 0.8% 86%, 0% 70%, 0.7% 54%, 0% 38%, 0.6% 22%, 0% 8%)"
  ];
  const VIGNETTE = "radial-gradient(ellipse at center, transparent 30%, rgba(100,72,36,0.16) 100%)";


  // The page being revealed beneath the exiting page
  const revealPage =
    exitingPage !== null
      ? currentPage + (flipDir === "forward" ? 1 : -1)
      : currentPage;

  // Curated per-depth irregularity for the decorative background stack
  const STACK = [
    { r: 1.7, x: 8, y: 7 },
    { r: -0.8, x: -5, y: 5 },
    { r: 1.2, x: 6, y: 3 },
  ];

  return (
    <>
      {/* ── Trigger button (visually identical to original) ── */}
      <button
        onClick={handleOpen}
        className="w-full py-4 border flex items-center justify-between px-6 transition-all duration-300 hover:border-[#c9a84c] group mt-3"
        style={{ borderColor: "#2e2820" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-[#c9a84c] flex items-center justify-center">
            <span className="text-[10px] text-[#c9a84c]">CG</span>
          </div>
          <div className="text-left">
            <p className="text-xs tracking-[0.2em] text-[#f0e8d6]">CARE GUIDE</p>
            <p className="text-[10px] text-[#7a6a58]">How to use, clean &amp; maintain</p>
          </div>
        </div>
        <span className="text-[#c9a84c] text-sm group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,8,6,0.95)" }}
          onClick={() => setOpen(false)}
        >
          {/* CSS keyframe animations for the page flip */}
          <style>{`
            @keyframes hp-flip-fwd {
              from { transform: perspective(1100px) rotateX(0deg); opacity: 1; }
              to   { transform: perspective(1100px) rotateX(-100deg) translateY(-28px) scale(0.95); opacity: 0; }
            }
            @keyframes hp-flip-back {
              from { transform: perspective(1100px) rotateX(0deg); opacity: 1; }
              to   { transform: perspective(1100px) rotateX(100deg) translateY(28px) scale(0.95); opacity: 0; }
            }
          `}</style>

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            aria-label="Close Care Guide"
            className="absolute top-6 right-8 z-20 transition-opacity hover:opacity-100"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.35em", color: "#c9a84c", opacity: 0.65, background: "none", border: "none" }}
          >
            ✕ CLOSE
          </button>

          <div
            className="relative"
            style={{ zIndex: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ══ FLIP-BOOK STACK ══ */}
            <div
              style={{ position: "relative", width: "420px", height: "560px" }}
              onTouchStart={(e) => { touchStartYRef.current = e.touches[0].clientY; }}
              onTouchEnd={(e) => {
                if (touchStartYRef.current === null) return;
                const delta = touchStartYRef.current - e.changedTouches[0].clientY;
                if (Math.abs(delta) > 44) doFlip(delta > 0 ? "forward" : "back");
                touchStartYRef.current = null;
              }}
            >
              {/* 3 decorative background layers — each with its own torn clip */}
              {[3, 2, 1].map((depth) => {
                const off = STACK[depth - 1];
                // background pages peek through with torn edge matching current stack position
                const bgClipIdx = Math.min(depth, TORN_CLIPS.length - 1);
                return (
                  <div
                    key={`bg-${depth}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: PARCHMENT,
                      zIndex: depth,
                      opacity: Math.max(0.38, 0.88 - depth * 0.2),
                      filter: `brightness(${Math.max(0.78, 1 - depth * 0.08)})`,
                      boxShadow: `0 ${depth * 6 + 10}px ${depth * 20 + 24}px rgba(0,0,0,${0.28 + depth * 0.08})`,
                      clipPath: TORN_CLIPS[bgClipIdx],
                      transform: `rotate(${off.r}deg) translate(${off.x}px, ${off.y + depth * 4}px)`,
                    }}
                  >
                    <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, pointerEvents: "none" }} />
                  </div>
                );
              })}

              {/* Exiting page — flies away with its own torn clip */}
              {exitingPage !== null && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: PARCHMENT,
                    zIndex: 15,
                    clipPath: TORN_CLIPS[exitingPage] || TORN_CLIPS[0],
                    boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
                    transformOrigin: flipDir === "forward" ? "top center" : "bottom center",
                    animation: flipDir === "forward"
                      ? "hp-flip-fwd 0.52s cubic-bezier(0.4, 0, 1, 1) forwards"
                      : "hp-flip-back 0.52s cubic-bezier(0.4, 0, 1, 1) forwards",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: VIGNETTE, pointerEvents: "none" }} />
                  <PageContent
                    section={sections[exitingPage]}
                    romanNumeral={ROMAN[exitingPage] || ""}
                    pageIndex={exitingPage}
                  />
                </div>
              )}

              {/* Current / reveal page — uses its own torn clip per page index */}
              {revealPage >= 0 && revealPage < totalPages && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: PARCHMENT,
                    zIndex: 10,
                    clipPath: TORN_CLIPS[revealPage] || TORN_CLIPS[0],
                    boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: VIGNETTE, pointerEvents: "none" }} />
                  <PageContent
                    section={sections[revealPage]}
                    romanNumeral={ROMAN[revealPage] || ""}
                    pageIndex={revealPage}
                  />
                </div>
              )}
            </div>

            {/* Navigation row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "28px", padding: "0 4px" }}>
              <button
                id="care-guide-prev"
                onClick={() => doFlip("back")}
                disabled={currentPage <= 0 || exitingPage !== null}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "8px",
                  letterSpacing: "0.38em",
                  color: currentPage <= 0 ? "rgba(201,168,76,0.28)" : "#c9a84c",
                  background: "none",
                  border: "none",
                  padding: "8px 0",
                  transition: "color 0.2s",
                  opacity: currentPage <= 0 ? 0.4 : 1,
                }}
              >
                ← PREV
              </button>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "8px", letterSpacing: "0.4em", color: "rgba(201,168,76,0.55)" }}>
                {ROMAN[currentPage]} / {ROMAN[totalPages - 1]}
              </p>
              <button
                id="care-guide-next"
                onClick={() => doFlip("forward")}
                disabled={currentPage >= totalPages - 1 || exitingPage !== null}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "8px",
                  letterSpacing: "0.38em",
                  color: currentPage >= totalPages - 1 ? "rgba(201,168,76,0.28)" : "#c9a84c",
                  background: "none",
                  border: "none",
                  padding: "8px 0",
                  transition: "color 0.2s",
                  opacity: currentPage >= totalPages - 1 ? 0.4 : 1,
                }}
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addRecentlyViewed } = useAuth();

  const product = getProduct(slug || "");
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    if (product) addRecentlyViewed(product.slug);
  }, [slug]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "#0e0c0a" }}>
        <p className="font-['Fraunces'] text-4xl text-[#f0e8d6] mb-4">Object not found.</p>
        <Link to="/products" className="text-sm text-[#b87333] tracking-widest">← ALL OBJECTS</Link>
      </div>
    );
  }

  const material = getMaterial(product.materialSlug);
  const accentColor = material?.accentColor || "#b87333";

  const related = products
    .filter((p) => p.materialSlug === product.materialSlug && p.slug !== product.slug)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="pt-24 px-8 md:px-16 pb-0 flex items-center gap-3 text-[10px] tracking-widest text-[#4a3f34]">
        <Link to="/products" className="hover:text-[#b87333] transition-colors">PRODUCTS</Link>
        <span>›</span>
        <Link to={`/materials/${product.materialSlug}`} className="hover:text-[#b87333] transition-colors">
          {product.material.toUpperCase()}
        </Link>
        <span>›</span>
        <span style={{ color: "#7a6a58" }}>{product.name.toUpperCase()}</span>
      </div>

      {/* Main product section */}
      <div className="px-8 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "4/5" }}>
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-500"
              style={{ filter: "brightness(0.75) saturate(0.75)" }}
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
              style={{ background: "rgba(14,12,10,0.7)" }}
              onClick={() => toggle(product)}
              aria-label={isWishlisted(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted(product.slug) ? accentColor : "none"} stroke={accentColor} strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="w-16 h-20 overflow-hidden border-2 transition-colors"
                  style={{ borderColor: activeImage === i ? accentColor : "transparent" }}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.7) saturate(0.7)" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          {/* Material tag */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              to={`/materials/${product.materialSlug}`}
              className="text-[10px] tracking-[0.25em] px-3 py-1.5 border transition-colors hover:bg-[#b87333] hover:text-[#0e0c0a]"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {product.material.toUpperCase()}
            </Link>
            <span className="text-[10px] text-[#7a6a58] tracking-widest">{product.region}</span>
          </div>

          <h1 className="font-['Fraunces'] text-3xl md:text-4xl text-[#f0e8d6] mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-2.5 h-2.5 rounded-full" style={{ background: s <= Math.round(product.rating) ? accentColor : "#2e2820" }} />
              ))}
            </div>
            <span className="text-xs text-[#7a6a58]">{product.rating} ({product.ratingCount} reviews)</span>
          </div>

          <p className="text-sm text-[#c8b89a] leading-relaxed mb-8">{product.description}</p>

          {/* Price */}
          <p className="font-['Fraunces'] text-4xl mb-8" style={{ color: accentColor }}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[10px] tracking-widest text-[#7a6a58]">QTY</p>
            <div className="flex items-center border" style={{ borderColor: "#2e2820" }}>
              <button
                className="w-10 h-10 flex items-center justify-center text-[#c8b89a] hover:text-[#f0e8d6]"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
              >−</button>
              <span className="w-10 text-center text-sm text-[#f0e8d6]">{qty}</span>
              <button
                className="w-10 h-10 flex items-center justify-center text-[#c8b89a] hover:text-[#f0e8d6]"
                onClick={() => setQty(qty + 1)}
                aria-label="Increase quantity"
              >+</button>
            </div>
          </div>

          {/* Add to cart / Buy now */}
          <div className="flex flex-col gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 text-sm tracking-[0.2em] font-medium transition-all duration-300 relative overflow-hidden"
              style={{
                background: addedAnimation ? "#c9a84c" : accentColor,
                color: "#0e0c0a",
              }}
            >
              {addedAnimation ? "ADDED TO CART ✓" : "ADD TO CART"}
            </button>
            <button
              onClick={() => { addItem(product, qty); navigate("/checkout"); }}
              className="w-full py-4 text-sm tracking-[0.2em] border transition-all duration-300 hover:bg-[#f0e8d6] hover:text-[#0e0c0a]"
              style={{ borderColor: "#f0e8d6", color: "#f0e8d6" }}
            >
              BUY NOW
            </button>
          </div>

          {/* Heritage Passport & Care */}
          <HeritagePassport product={product} />
          <CareModal materialSlug={product.materialSlug} productName={product.name} />

          {/* Artisan */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "#2e2820" }}>
            <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-2">CRAFT COMMUNITY</p>
            <p className="text-sm text-[#c8b89a]">{product.artisanCommunity}</p>
          </div>
        </div>
      </div>

      {/* Story sections */}
      <div
        className="px-8 md:px-16 py-20 border-t grid grid-cols-1 md:grid-cols-2 gap-16"
        style={{ borderColor: "#2e2820" }}
      >
        <div>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">THE STORY</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed">{product.story}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">THE MATERIAL</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed mb-8">{getMaterial(product.materialSlug)?.shortDesc}</p>
          <Link
            to={`/materials/${product.materialSlug}`}
            className="text-xs tracking-[0.2em] text-[#b87333] border-b border-[#b87333]/30 pb-0.5 hover:border-[#b87333] transition-colors"
          >
            EXPLORE {product.material.toUpperCase()} STORY →
          </Link>
        </div>
      </div>

      <div
        className="px-8 md:px-16 py-16 border-t grid grid-cols-1 md:grid-cols-2 gap-16"
        style={{ borderColor: "#2e2820" }}
      >
        <div>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">TRADITIONAL USE</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed">{product.traditionalUse}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">MODERN USE</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed">{product.modernUse}</p>
        </div>
      </div>

      <div
        className="px-8 md:px-16 py-16 border-t"
        style={{ borderColor: "#2e2820" }}
      >
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">CRAFT PROCESS</p>
        <p className="text-sm text-[#c8b89a] leading-relaxed max-w-2xl">{product.craftProcess}</p>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="px-8 md:px-16 py-16 border-t" style={{ borderColor: "#2e2820" }}>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">RELATED OBJECTS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <div
                key={p.slug}
                className="cursor-pointer group"
                onClick={() => navigate(`/products/${p.slug}`)}
                data-cursor="view"
              >
                <div className="aspect-square overflow-hidden mb-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.65) saturate(0.7)" }}
                  />
                </div>
                <p className="text-xs text-[#f0e8d6]">{p.name}</p>
                <p className="text-xs mt-1" style={{ color: accentColor }}>₹{p.price.toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
