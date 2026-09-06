import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getMaterial } from "../data/materials";
import { getTimeline } from "../data/timelines";
import { getProductsByMaterial } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import type { TimelineStage } from "../types";

/* ── Timeline ── */
function MaterialTimeline({ stages, accentColor }: { stages: TimelineStage[]; accentColor: string }) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  const goto = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 500);
  };

  const prev = () => goto(Math.max(0, current - 1));
  const next = () => goto(Math.min(stages.length - 1, current + 1));

  // Touch/drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const stage = stages[current];

  return (
    <div className="relative" style={{ background: "#0a0806" }}>
      <div className="px-8 md:px-16 pt-16 pb-8">
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-2">OBJECT HERITAGE TIMELINE</p>
        <p className="text-xs text-[#4a3f34] tracking-widest">DRAG OR USE ARROWS TO NAVIGATE</p>
      </div>

      {/* Main timeline display */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ height: "clamp(420px, 65vh, 720px)" }}
        data-cursor="drag"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setDragging(false)}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            key={stage.image}
            src={stage.image}
            alt={stage.title}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ filter: "brightness(0.2) saturate(0.5)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(10,8,6,0.98) 45%, rgba(10,8,6,0.3) 100%)" }}
          />
        </div>

        {/* Right image panel */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-2/5 hidden md:block overflow-hidden">
          <img
            key={stage.id}
            src={stage.image}
            alt={stage.title}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ filter: "brightness(0.6) saturate(0.7)", transform: animating ? "scale(1.04)" : "scale(1)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(10,8,6,0.6) 0%, transparent 50%)" }}
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 px-8 md:px-16 flex flex-col justify-center max-w-xl">
          {/* Period / date — large */}
          <div
            className="font-['Fraunces'] leading-none mb-6 transition-all duration-500"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: accentColor,
              opacity: animating ? 0 : 0.7,
              transform: animating ? "translateY(10px)" : "none",
            }}
          >
            {stage.period}
          </div>

          {/* Stage number + title */}
          <div
            className="transition-all duration-500"
            style={{ opacity: animating ? 0 : 1, transitionDelay: animating ? "0ms" : "100ms" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-[10px] tracking-[0.3em] px-2 py-0.5"
                style={{ background: accentColor, color: "#0e0c0a" }}
              >
                {stage.stageNumber}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#7a6a58]">{stage.region}</span>
            </div>

            <h3 className="font-['Fraunces'] text-2xl md:text-3xl mb-4" style={{ color: "#f0e8d6" }}>
              {stage.title}
            </h3>

            <p className="text-sm text-[#c8b89a] leading-relaxed max-w-sm">{stage.story}</p>

            <div className="mt-6 flex flex-col gap-2">
              {[
                { label: "CRAFT", value: stage.craftTechnique },
                { label: "OBJECT", value: stage.representativeObject },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 text-xs">
                  <span className="text-[#7a6a58] tracking-widest w-16 shrink-0">{item.label}</span>
                  <span className="text-[#c8b89a]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar + controls */}
      <div className="px-8 md:px-16 py-6 flex flex-col gap-4">
        {/* Progress bar */}
        <div className="flex gap-1">
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              className="flex-1 h-px transition-all duration-300"
              style={{ background: i === current ? accentColor : "#2e2820" }}
              aria-label={`Stage ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#4a3f34] tracking-widest">
            {String(current + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
          </p>
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 border flex items-center justify-center transition-all duration-200 disabled:opacity-20 hover:border-[#b87333]"
              style={{ borderColor: "#2e2820" }}
              aria-label="Previous stage"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={next}
              disabled={current === stages.length - 1}
              className="w-10 h-10 border flex items-center justify-center transition-all duration-200 disabled:opacity-20 hover:border-[#b87333]"
              style={{ borderColor: "#2e2820" }}
              aria-label="Next stage"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function MaterialDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const material = getMaterial(slug || "");
  const timeline = getTimeline(slug || "");
  const relatedProducts = getProductsByMaterial(slug || "");

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!material) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "#0e0c0a" }}>
        <p className="font-['Fraunces'] text-4xl text-[#f0e8d6] mb-4">Material not found.</p>
        <Link to="/materials" className="text-sm text-[#b87333] tracking-widest">← ALL MATERIALS</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#0e0c0a" }}>
      {/* Back */}
      <div className="absolute top-20 left-8 md:left-16 z-20 pt-4">
        <Link to="/materials" className="text-[10px] tracking-[0.25em] text-[#7a6a58] hover:text-[#b87333] transition-colors">
          ← MATERIALS
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-screen min-h-[500px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={material.heroImage}
            alt={material.name}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(0.7)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, #0e0c0a 25%, transparent 65%)` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at left, ${material.accentColor}15 0%, transparent 60%)` }}
          />
        </div>

        <div className="relative z-10 px-8 md:px-16 pb-20">
          <p className="text-[10px] tracking-[0.4em] mb-4" style={{ color: material.accentColor }}>
            {material.number} — MATERIAL STORY
          </p>
          <h1
            className="font-['Fraunces'] leading-none"
            style={{
              fontSize: "clamp(4rem, 15vw, 12rem)",
              color: "#f0e8d6",
            }}
          >
            {material.name.toUpperCase()}
          </h1>
          <p className="mt-6 text-base text-[#c8b89a] max-w-lg leading-relaxed">
            {material.shortDesc}
          </p>
          <p className="mt-2 text-xs text-[#7a6a58] tracking-widest">{material.region}</p>
        </div>
      </section>

      {/* Essence */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-4xl">
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">MATERIAL ESSENCE</p>
          <h2
            className="font-['Fraunces'] text-3xl md:text-5xl mb-8"
            style={{ color: material.accentColor }}
          >
            {material.essenceTitle}
          </h2>
          <p className="text-base md:text-lg text-[#c8b89a] leading-relaxed mb-10">
            {material.essenceBody}
          </p>
          <p className="text-sm text-[#f0e8d6] leading-relaxed max-w-2xl">{material.description}</p>
        </div>
      </section>

      {/* Timeline */}
      {timeline && (
        <MaterialTimeline stages={timeline.stages} accentColor={material.accentColor} />
      )}

      {/* Craft Process */}
      <section className="py-24 px-8 md:px-16" style={{ background: "#0a0806" }}>
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">CRAFT PROCESS</p>
        <h2 className="font-['Fraunces'] text-3xl md:text-5xl mb-16" style={{ color: "#f0e8d6" }}>
          {material.craftTitle}
        </h2>
        <p className="text-xs text-[#7a6a58] mb-12 tracking-widest">
          Traditional processes may include, but are not limited to, the following stages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {material.craftSteps.map((step, i) => (
            <div key={i} className="relative">
              {i < material.craftSteps.length - 1 && (
                <div
                  className="hidden md:block absolute top-4 left-full w-full h-px z-0"
                  style={{ background: "#2e2820" }}
                />
              )}
              <div
                className="relative z-10 w-8 h-8 border flex items-center justify-center text-xs mb-4"
                style={{ borderColor: material.accentColor, color: material.accentColor }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-sm font-medium text-[#f0e8d6] mb-2">{step.step}</p>
              <p className="text-xs text-[#7a6a58] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Role */}
      <section className="py-24 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">CULTURAL ROLE</p>
            <p className="text-base text-[#c8b89a] leading-relaxed mb-6">{material.culturalRole}</p>
            <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mt-8 mb-4">TRADITIONAL USE</p>
            <p className="text-sm text-[#c8b89a] leading-relaxed">{material.traditionalUse}</p>
          </div>
          <div
            className="aspect-square overflow-hidden"
            style={{ borderLeft: `2px solid ${material.accentColor}30` }}
          >
            <img
              src={material.heroImage}
              alt={`${material.name} cultural role`}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.5) saturate(0.6)" }}
            />
          </div>
        </div>
      </section>

      {/* Modern Life */}
      <section
        className="py-24 px-8 md:px-16"
        style={{ background: "#0a0806", borderTop: "1px solid #2e2820" }}
      >
        <div className="max-w-4xl">
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">MODERN LIFE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs tracking-widest text-[#7a6a58] mb-4">USED THEN</p>
              <p className="font-['Fraunces'] text-2xl text-[#f0e8d6] mb-2">{material.usedThen}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-[#7a6a58] mb-4">USED TODAY</p>
              <p className="font-['Fraunces'] text-2xl" style={{ color: material.accentColor }}>{material.usedToday}</p>
            </div>
          </div>
          <div className="mt-12 pt-12 border-t" style={{ borderColor: "#2e2820" }}>
            <p
              className="font-['Fraunces'] italic text-2xl md:text-3xl"
              style={{ color: "#c8b89a" }}
            >
              "Centuries of material knowledge.
              <br />
              <span style={{ color: material.accentColor }}>Designed for modern life.</span>"
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] transition-all duration-300 hover:opacity-80"
              style={{ background: material.accentColor, color: "#0e0c0a" }}
            >
              EXPLORE OBJECTS →
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-8 md:px-16">
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">PRODUCTS</p>
          <h2 className="font-['Fraunces'] text-3xl md:text-5xl mb-12" style={{ color: "#f0e8d6" }}>
            {material.name} Objects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 6).map((product) => (
              <div
                key={product.slug}
                className="group cursor-pointer"
                onClick={() => navigate(`/products/${product.slug}`)}
                data-cursor="view"
              >
                <div className="overflow-hidden aspect-[3/4] mb-4 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.7) saturate(0.7)" }}
                  />
                  <button
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-colors"
                    onClick={(e) => { e.stopPropagation(); toggle(product); }}
                    aria-label="Toggle wishlist"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted(product.slug) ? material.accentColor : "none"} stroke={material.accentColor} strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-[#7a6a58] tracking-widest mb-1">{product.material} · {product.region}</p>
                <p className="text-sm text-[#f0e8d6] mb-2">{product.name}</p>
                <div className="flex items-center justify-between">
                  <p className="font-['Fraunces'] text-lg" style={{ color: material.accentColor }}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); addItem(product); }}
                    className="text-[10px] tracking-[0.2em] px-3 py-1.5 border transition-colors duration-200 hover:bg-[#b87333] hover:border-[#b87333] hover:text-[#0e0c0a]"
                    style={{ borderColor: "#2e2820", color: "#c8b89a" }}
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
