import { useState } from "react";
import { useNavigate } from "react-router";
import { materials } from "../data/materials";

export default function Materials() {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-36 pb-16 px-8 md:px-16">
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">THE MATERIALS OF INDIA</p>
        <h1 className="font-['Fraunces'] text-5xl md:text-7xl lg:text-8xl" style={{ color: "#f0e8d6" }}>
          SIX MATERIALS.
          <br />
          <span style={{ color: "#b87333" }}>THOUSANDS OF YEARS.</span>
        </h1>
        <p className="mt-6 text-base text-[#c8b89a] max-w-xl">
          Each material carries a distinct heritage, craft tradition, and cultural role. Enter any material to discover its complete story.
        </p>
      </div>

      {/* Materials list — editorial */}
      <div className="px-8 md:px-16 pb-24">
        {materials.map((material, i) => (
          <div
            key={material.slug}
            className="relative border-b cursor-pointer group"
            style={{ borderColor: "#2e2820" }}
            onMouseEnter={() => setHovered(material.slug)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(`/materials/${material.slug}`)}
          >
            <div className="py-8 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Number */}
              <div className="md:col-span-1">
                <span
                  className="font-['Fraunces'] text-xl"
                  style={{ color: hovered === material.slug ? material.accentColor : "#4a3f34" }}
                >
                  {material.number}
                </span>
              </div>

              {/* Name */}
              <div className="md:col-span-3">
                <h2
                  className="font-['Fraunces'] text-4xl md:text-5xl lg:text-6xl transition-colors duration-300"
                  style={{ color: hovered === material.slug ? material.accentColor : "#f0e8d6" }}
                >
                  {material.name.toUpperCase()}
                </h2>
              </div>

              {/* Region */}
              <div className="md:col-span-2">
                <p className="text-xs text-[#7a6a58] tracking-widest">
                  {material.region.split(",")[0]}
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-4">
                <p className="text-sm text-[#c8b89a] leading-relaxed">{material.shortDesc}</p>
              </div>

              {/* CTA */}
              <div className="md:col-span-2 flex justify-end">
                <span
                  className="text-xs tracking-[0.2em] transition-all duration-300 flex items-center gap-2"
                  style={{
                    color: material.accentColor,
                    opacity: hovered === material.slug ? 1 : 0.4,
                  }}
                >
                  ENTER →
                </span>
              </div>
            </div>

            {/* Hover image */}
            <div
              className="absolute right-24 top-1/2 -translate-y-1/2 w-48 h-32 overflow-hidden pointer-events-none transition-all duration-500 z-10"
              style={{
                opacity: hovered === material.slug ? 1 : 0,
                transform: `translateY(${hovered === material.slug ? "-50%" : "-60%"})`,
              }}
            >
              <img
                src={material.cardImage}
                alt={material.name}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.8) saturate(0.8)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
