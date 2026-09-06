import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { materials } from "../data/materials";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Hero() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  const words = ["WHERE", "HERITAGE", "BECOMES", "EVERYDAY."];

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-start justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1652960018678-1f19799996c5?w=1800&h=1200&fit=crop&auto=format&q=85"
          alt="Traditional Indian brass vessels"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0e0c0a 30%, rgba(14,12,10,0.2) 70%)" }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-8 bottom-12 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] tracking-[0.3em] text-[#7a6a58] rotate-90 mb-2">SCROLL</span>
        <div className="w-px h-12 bg-[#b87333]/40 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-[#b87333]"
            style={{ animation: "slide-down 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-24 w-full">
        <div className="max-w-5xl">
          {/* Year tag */}
          <p
            className="text-[10px] tracking-[0.4em] text-[#7a6a58] mb-8 transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(8px)" }}
          >
            SATTVA CLOUD ANGADI — HERITAGE COMMERCE
          </p>

          {/* Headline */}
          <div className="flex flex-col">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <h1
                  className={`font-['Fraunces'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] transition-all duration-1000 ${
                    i === 0
                      ? "tracking-tight -ml-[0.035em] sm:-ml-[0.04em]"
                      : "tracking-tighter"
                  }`}
                  style={{
                    color: i === 0 || i === 3 ? "#b87333" : "#f0e8d6",
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(100%)",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  {word}
                </h1>
              </div>
            ))}
          </div>

          {/* Subheading */}
          <p
            className="mt-8 text-sm md:text-base text-[#c8b89a] max-w-md leading-relaxed transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transitionDelay: "600ms" }}
          >
            Traditional materials. Timeless craft. Designed for modern life.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap gap-4 transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transitionDelay: "800ms" }}
          >
            <button
              onClick={() => navigate("/materials")}
              className="px-8 py-3.5 text-xs tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#c98840]"
              style={{ background: "#b87333", color: "#0e0c0a" }}
            >
              EXPLORE MATERIALS
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3.5 text-xs tracking-[0.2em] font-medium border transition-all duration-300 hover:bg-[#f0e8d6] hover:text-[#0e0c0a]"
              style={{ borderColor: "#f0e8d6", color: "#f0e8d6" }}
            >
              EXPLORE PRODUCTS
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

function Philosophy() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="relative py-32 px-8 md:px-16 overflow-hidden" style={{ background: "#0e0c0a" }}>
      {/* Large background text */}
      <div
        className="absolute top-0 right-0 font-['Fraunces'] select-none pointer-events-none"
        style={{ fontSize: "clamp(100px, 18vw, 240px)", color: "rgba(184,115,51,0.04)", lineHeight: 1 }}
      >
        SATTVA
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Main statement */}
        <div className="max-w-4xl">
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">PHILOSOPHY</p>
          <h2
            className="font-['Fraunces'] text-4xl md:text-6xl lg:text-7xl leading-[1.05] transition-all duration-1000"
            style={{
              color: "#f0e8d6",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(30px)",
            }}
          >
            HERITAGE IS NOT
            <br />
            <span style={{ color: "#b87333" }}>DECORATION.</span>
            <br />
            HERITAGE IS
            <br />
            <span style={{ color: "#d4a843" }}>EXPERIENCE.</span>
          </h2>

          <p
            className="mt-10 text-base md:text-lg text-[#c8b89a] max-w-xl leading-relaxed transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transitionDelay: "300ms" }}
          >
            Sattva brings traditional materials, craftsmanship and everyday practices into contemporary life.
          </p>
        </div>

        {/* Name meaning */}
        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-t"
          style={{ borderColor: "#2e2820", opacity: visible ? 1 : 0, transition: "opacity 0.8s 0.5s" }}
        >
          {[
            { word: "SATTVA", meaning: "Purity and balance", subtext: "The quality of clarity" },
            { word: "CLOUD", meaning: "Digital bridge", subtext: "Heritage in modern life" },
            { word: "ANGADI", meaning: "Traditional marketplace", subtext: "Where exchange happens" },
          ].map((item, i) => (
            <div
              key={item.word}
              className="pt-8 md:pr-12"
              style={{ borderLeft: i > 0 ? "1px solid #2e2820" : "none", paddingLeft: i > 0 ? "3rem" : "0" }}
            >
              <p className="font-['Fraunces'] text-3xl" style={{ color: "#b87333" }}>{item.word}</p>
              <p className="text-sm text-[#f0e8d6] mt-2">{item.meaning}</p>
              <p className="text-xs text-[#7a6a58] mt-1">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* Core message */}
        <div
          className="mt-24 max-w-3xl"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s 0.7s" }}
        >
          <p
            className="font-['Fraunces'] italic text-2xl md:text-3xl leading-relaxed"
            style={{ color: "#c8b89a" }}
          >
            "We do not simply sell traditional objects.
            <br />
            We help people{" "}
            <span style={{ color: "#b87333" }}>understand them</span>,{" "}
            <span style={{ color: "#c9a84c" }}>experience them</span>,{" "}
            <span style={{ color: "#f0e8d6" }}>use them</span>,{" "}
            <span style={{ color: "#b87333" }}>care for them</span>,
            <br />
            and carry their stories forward."
          </p>
        </div>
      </div>
    </section>
  );
}

function MaterialShowcase() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section className="py-24 px-8 md:px-16" style={{ background: "#0a0806" }}>
      <div ref={ref}>
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-3">THE MATERIALS</p>
            <h2
              className="font-['Fraunces'] text-4xl md:text-6xl transition-all duration-700"
              style={{ color: "#f0e8d6", opacity: visible ? 1 : 0 }}
            >
              THE MATERIALS
              <br />
              OF INDIA
            </h2>
          </div>
          <Link
            to="/materials"
            className="hidden md:block text-xs tracking-[0.2em] text-[#7a6a58] hover:text-[#b87333] transition-colors border-b border-[#2e2820] pb-1"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Material grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {materials.map((material, i) => (
            <MaterialCard key={material.slug} material={material} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialCard({ material, index, visible }: { material: typeof materials[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: "3/4",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition: `opacity 0.8s ${index * 100}ms, transform 0.8s ${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/materials/${material.slug}`)}
      data-cursor="view"
    >
      {/* Image */}
      <img
        src={material.cardImage}
        alt={material.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          filter: "brightness(0.5) saturate(0.7)",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to top, ${material.accentColor}33 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0.5,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(14,12,10,0.9) 30%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span
            className="font-['Fraunces'] text-5xl md:text-6xl font-light"
            style={{ color: `${material.accentColor}40` }}
          >
            {material.number}
          </span>
          <span
            className="text-[9px] tracking-[0.3em] px-2 py-1 border transition-all duration-300"
            style={{
              borderColor: material.accentColor,
              color: material.accentColor,
              opacity: hovered ? 1 : 0,
            }}
          >
            {material.region.split(",")[0]}
          </span>
        </div>

        <div>
          <h3
            className="font-['Fraunces'] text-3xl md:text-4xl leading-none mb-3 transition-transform duration-300"
            style={{
              color: "#f0e8d6",
              transform: hovered ? "translateY(-4px)" : "none",
            }}
          >
            {material.name.toUpperCase()}
          </h3>

          <p
            className="text-xs text-[#c8b89a] leading-relaxed transition-all duration-300 max-w-xs"
            style={{ opacity: hovered ? 1 : 0.7 }}
          >
            {material.shortDesc}
          </p>

          <div
            className="mt-5 flex items-center gap-2 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
          >
            <span className="text-xs tracking-[0.2em]" style={{ color: material.accentColor }}>
              ENTER MATERIAL
            </span>
            <span style={{ color: material.accentColor }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedJourney() {
  const { ref, visible } = useScrollReveal(0.1);
  const steps = [
    { label: "DISCOVER", sub: "the material" },
    { label: "UNDERSTAND", sub: "its heritage" },
    { label: "EXPERIENCE", sub: "its craft" },
    { label: "OWN", sub: "the object" },
    { label: "USE", sub: "every day" },
    { label: "CARE", sub: "and maintain" },
    { label: "CONTINUE", sub: "the story" },
  ];

  return (
    <section className="py-32 px-8 md:px-16 overflow-hidden" style={{ background: "#0e0c0a" }}>
      <div ref={ref}>
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">THE JOURNEY</p>
        <h2
          className="font-['Fraunces'] text-4xl md:text-6xl mb-16 transition-all duration-700"
          style={{ color: "#f0e8d6", opacity: visible ? 1 : 0 }}
        >
          Most marketplaces show
          <br />
          you the object.
          <br />
          <span style={{ color: "#b87333" }}>Sattva shows you the journey</span>
          <br />
          that gave the object meaning.
        </h2>

        <div className="flex flex-wrap gap-0">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="flex items-center"
              style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ${i * 80}ms` }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-xs"
                  style={{ borderColor: "#b87333", color: "#b87333" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[9px] tracking-[0.15em] mt-2 text-[#f0e8d6]">{step.label}</p>
                <p className="text-[8px] text-[#7a6a58]">{step.sub}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 md:w-12 h-px mx-2" style={{ background: "#2e2820" }} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/materials"
            className="inline-flex items-center gap-3 px-8 py-4 border text-xs tracking-[0.2em] transition-all duration-300 hover:bg-[#b87333] hover:border-[#b87333] hover:text-[#0e0c0a]"
            style={{ borderColor: "#b87333", color: "#b87333" }}
          >
            BEGIN THE JOURNEY →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Philosophy />
      <MaterialShowcase />
      <FeaturedJourney />
    </div>
  );
}
