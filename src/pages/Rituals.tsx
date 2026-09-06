import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { rituals, getRitual } from "../data/rituals";
import { getProduct } from "../data/products";
import { useCart } from "../context/CartContext";

const CATEGORY_LABELS: Record<string, string> = {
  wellness: "DAILY WELLNESS",
  cooking: "TRADITIONAL COOKING",
  puja: "PUJA",
  dining: "DINING",
  gifting: "GIFTING",
  home: "HOME HERITAGE",
};

function RitualDetailView({ id }: { id: string }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const ritual = getRitual(id);

  if (!ritual) return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "#0e0c0a" }}>
      <p className="font-['Fraunces'] text-3xl text-[#f0e8d6] mb-4">Ritual not found.</p>
      <button onClick={() => navigate("/rituals")} className="text-sm text-[#b87333]">← ALL RITUALS</button>
    </div>
  );

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[350px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={ritual.image} alt={ritual.title} className="w-full h-full object-cover" style={{ filter: "brightness(0.3) saturate(0.6)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0c0a 35%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 px-8 md:px-16 pb-16">
          <button onClick={() => navigate("/rituals")} className="text-[10px] tracking-widest text-[#7a6a58] hover:text-[#b87333] mb-6 block transition-colors">
            ← ALL RITUALS
          </button>
          <p className="text-[10px] tracking-[0.35em] text-[#b87333] mb-3">{CATEGORY_LABELS[ritual.category]}</p>
          <h1 className="font-['Fraunces'] text-4xl md:text-6xl text-[#f0e8d6] max-w-2xl leading-tight">{ritual.title}</h1>
        </div>
      </section>

      <div className="px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">ABOUT THIS PRACTICE</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed mb-8">{ritual.description}</p>

          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">TRADITIONAL CONTEXT</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed mb-12">{ritual.traditionalContext}</p>

          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">STEPS</p>
          <div className="flex flex-col gap-6">
            {ritual.steps.map((step) => (
              <div key={step.step} className="flex gap-6">
                <div
                  className="w-8 h-8 border flex items-center justify-center text-xs shrink-0 mt-0.5"
                  style={{ borderColor: "#b87333", color: "#b87333" }}
                >
                  {String(step.step).padStart(2, "0")}
                </div>
                <p className="text-sm text-[#c8b89a] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {ritual.disclaimer && (
            <div
              className="mt-12 p-5 border text-xs text-[#7a6a58] leading-relaxed"
              style={{ borderColor: "#2e2820" }}
            >
              <p className="text-[10px] tracking-widest text-[#4a3f34] mb-2">NOTE</p>
              {ritual.disclaimer}
            </div>
          )}
        </div>

        <div>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">WHAT YOU NEED</p>
          <ul className="flex flex-col gap-3 mb-10">
            {ritual.whatYouNeed.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#c8b89a]">
                <span style={{ color: "#b87333" }}>—</span>{item}
              </li>
            ))}
          </ul>

          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">MATERIALS</p>
          <div className="flex flex-wrap gap-2 mb-10">
            {ritual.materials.map((m) => (
              <span key={m} className="text-[10px] tracking-widest px-3 py-1.5 border capitalize" style={{ borderColor: "#2e2820", color: "#7a6a58" }}>{m}</span>
            ))}
          </div>

          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">RELATED OBJECTS</p>
          <div className="flex flex-col gap-4">
            {ritual.relatedProductSlugs.map((slug) => {
              const product = getProduct(slug);
              if (!product) return null;
              return (
                <div key={slug} className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate(`/products/${slug}`)}>
                  <div className="w-16 h-16 overflow-hidden shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={{ filter: "brightness(0.7)" }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#f0e8d6]">{product.name}</p>
                    <p className="text-xs text-[#b87333] mt-0.5">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                  <button
                    className="ml-auto text-[10px] px-3 py-1.5 border transition-colors hover:bg-[#b87333] hover:text-[#0e0c0a]"
                    style={{ borderColor: "#2e2820", color: "#7a6a58" }}
                    onClick={(e) => { e.stopPropagation(); addItem(product); }}
                  >
                    ADD
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RitualsGrid() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      <div className="pt-36 pb-16 px-8 md:px-16">
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">RITUAL DISCOVERY</p>
        <h1 className="font-['Fraunces'] text-5xl md:text-7xl" style={{ color: "#f0e8d6" }}>
          PRACTICES &
          <br />
          <span style={{ color: "#b87333" }}>RITUALS</span>
        </h1>
        <p className="mt-6 text-sm text-[#c8b89a] max-w-xl">
          Traditional Indian practices for daily wellness, cooking, dining, and home. Each ritual is an experience with its materials.
        </p>
      </div>

      <div className="px-8 md:px-16 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {rituals.map((ritual) => (
          <div
            key={ritual.id}
            className="relative overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "4/3" }}
            onMouseEnter={() => setHovered(ritual.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(`/rituals/${ritual.id}`)}
            data-cursor="view"
          >
            <img
              src={ritual.image}
              alt={ritual.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: hovered === ritual.id ? "scale(1.06)" : "scale(1)",
                filter: "brightness(0.35) saturate(0.6)",
              }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,12,10,0.95) 40%, transparent 80%)" }} />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-[10px] tracking-[0.25em] text-[#b87333] mb-2">{CATEGORY_LABELS[ritual.category]}</p>
              <h2 className="font-['Fraunces'] text-2xl text-[#f0e8d6] mb-2 leading-tight">{ritual.title}</h2>
              <p className="text-xs text-[#7a6a58] leading-relaxed line-clamp-2">{ritual.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {ritual.materials.map((m) => (
                  <span key={m} className="text-[9px] tracking-widest capitalize text-[#4a3f34]">{m}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Rituals() {
  const { id } = useParams<{ id?: string }>();
  return id ? <RitualDetailView id={id} /> : <RitualsGrid />;
}
