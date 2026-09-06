import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { artisans, getArtisan } from "../data/artisans";
import { getProduct } from "../data/products";

function ArtisanDetailView({ id }: { id: string }) {
  const navigate = useNavigate();
  const artisan = getArtisan(id);
  if (!artisan) return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "#0e0c0a" }}>
      <p className="font-['Fraunces'] text-3xl text-[#f0e8d6] mb-4">Artisan not found.</p>
      <button onClick={() => navigate("/artisans")} className="text-sm text-[#b87333]">← ALL ARTISANS</button>
    </div>
  );

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[400px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={artisan.image}
            alt={artisan.community}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(0.6)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0c0a 30%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 px-8 md:px-16 pb-16">
          <button onClick={() => navigate("/artisans")} className="text-[10px] tracking-widest text-[#7a6a58] hover:text-[#b87333] mb-6 block transition-colors">
            ← ALL ARTISANS
          </button>
          <p className="text-[10px] tracking-[0.35em] text-[#b87333] mb-3">THE HANDS BEHIND THE OBJECTS</p>
          <h1 className="font-['Fraunces'] text-4xl md:text-6xl text-[#f0e8d6] mb-4 max-w-2xl leading-tight">{artisan.community}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-[#7a6a58] tracking-widest">
            <span>{artisan.region}</span>
            <span>·</span>
            <span>{artisan.craft}</span>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">THE TRADITION</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed mb-8">{artisan.story}</p>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">HERITAGE</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed">{artisan.heritage}</p>
        </div>
        <div>
          <div className="aspect-[4/3] overflow-hidden mb-8">
            <img
              src={artisan.craftImage}
              alt={`${artisan.community} craft`}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.6) saturate(0.7)" }}
            />
          </div>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-3">CRAFT PROCESS</p>
          <p className="text-sm text-[#c8b89a] leading-relaxed">{artisan.process}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {artisan.materials.map((m) => (
              <span
                key={m}
                className="text-[10px] tracking-widest px-3 py-1.5 border capitalize"
                style={{ borderColor: "#2e2820", color: "#7a6a58" }}
              >{m}</span>
            ))}
          </div>
        </div>
      </div>

      {artisan.productSlugs.length > 0 && (
        <div className="px-8 md:px-16 py-16 border-t" style={{ borderColor: "#2e2820" }}>
          <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-8">THEIR OBJECTS</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artisan.productSlugs.map((slug) => {
              const product = getProduct(slug);
              if (!product) return null;
              return (
                <div
                  key={slug}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/products/${slug}`)}
                  data-cursor="view"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.65) saturate(0.7)" }}
                    />
                  </div>
                  <p className="text-xs text-[#f0e8d6]">{product.name}</p>
                  <p className="text-xs text-[#b87333] mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ArtisansGrid() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      <div className="pt-36 pb-16 px-8 md:px-16">
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">ARTISAN STORIES</p>
        <h1 className="font-['Fraunces'] text-5xl md:text-7xl" style={{ color: "#f0e8d6" }}>
          THE HANDS
          <br />
          <span style={{ color: "#b87333" }}>BEHIND THE OBJECTS.</span>
        </h1>
        <p className="mt-6 text-sm text-[#c8b89a] max-w-xl">
          Every object in Sattva Cloud Angadi comes from a community with a story. These are their traditions.
        </p>
      </div>

      <div className="px-8 md:px-16 pb-24">
        {artisans.map((artisan, i) => (
          <div
            key={artisan.id}
            className="relative border-b cursor-pointer group"
            style={{ borderColor: "#2e2820" }}
            onMouseEnter={() => setHovered(artisan.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(`/artisans/${artisan.id}`)}
          >
            <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-1">
                <span className="font-['Fraunces'] text-xl" style={{ color: "#4a3f34" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-3">
                <h2
                  className="font-['Fraunces'] text-2xl md:text-3xl transition-colors duration-300"
                  style={{ color: hovered === artisan.id ? "#b87333" : "#f0e8d6" }}
                >
                  {artisan.community}
                </h2>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-[#7a6a58] tracking-widest">{artisan.region}</p>
              </div>
              <div className="md:col-span-4">
                <p className="text-sm text-[#c8b89a] leading-relaxed">{artisan.craft}</p>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <span
                  className="text-xs tracking-[0.2em] flex items-center gap-2 transition-all duration-300"
                  style={{ color: "#b87333", opacity: hovered === artisan.id ? 1 : 0.3 }}
                >
                  THEIR STORY →
                </span>
              </div>
            </div>

            {/* Hover image */}
            <div
              className="absolute right-24 top-1/2 -translate-y-1/2 w-48 h-32 overflow-hidden pointer-events-none transition-all duration-500 z-10"
              style={{
                opacity: hovered === artisan.id ? 1 : 0,
                transform: `translateY(${hovered === artisan.id ? "-50%" : "-60%"})`,
              }}
            >
              <img src={artisan.craftImage} alt={artisan.community} className="w-full h-full object-cover" style={{ filter: "brightness(0.7) saturate(0.7)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Artisans() {
  const { id } = useParams<{ id?: string }>();
  return id ? <ArtisanDetailView id={id} /> : <ArtisansGrid />;
}
