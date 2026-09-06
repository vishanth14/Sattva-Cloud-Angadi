import { Link } from "react-router";

export default function Footer() {
  return (
    <footer
      style={{ background: "#0a0806", borderTop: "1px solid #2e2820" }}
      className="relative overflow-hidden"
    >
      {/* Manifesto */}
      <div className="px-8 md:px-16 pt-24 pb-16 border-b border-[#2e2820]">
        <div className="max-w-4xl">
          <p
            className="font-['Fraunces'] text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
            style={{ color: "#f0e8d6" }}
          >
            DON'T JUST BUY A
            <br />
            TRADITIONAL OBJECT.
          </p>
          <div className="mt-8 flex flex-col gap-2">
            {["UNDERSTAND IT.", "EXPERIENCE IT.", "USE IT.", "CARE FOR IT.", "KEEP ITS STORY ALIVE."].map(
              (line, i) => (
                <p
                  key={i}
                  className="font-['Fraunces'] text-2xl md:text-4xl"
                  style={{ color: i === 0 ? "#b87333" : i === 1 ? "#c9a84c" : `rgba(240,232,214,${0.9 - i * 0.1})` }}
                >
                  {line}
                </p>
              )
            )}
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-['Fraunces'] text-xl" style={{ color: "#b87333" }}>
              SATTVA
            </p>
            <p className="text-[10px] tracking-[0.3em] text-[#7a6a58] mt-1">CLOUD ANGADI</p>
            <p className="text-sm text-[#7a6a58] mt-4 leading-relaxed max-w-xs">
              Where heritage becomes everyday. Traditional materials. Timeless craft. Designed for modern life.
            </p>
          </div>

          {/* Discover */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-4">DISCOVER</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Materials", href: "/materials" },
                { label: "Products", href: "/products" },
                { label: "Artisans", href: "/artisans" },
                { label: "Rituals", href: "/rituals" },
              ].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-sm text-[#c8b89a] hover:text-[#f0e8d6] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Companion */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-4">COMPANION</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "ROOTS Companion", href: "/roots" },
                { label: "Cart", href: "/cart" },
                { label: "Account", href: "/account" },
                { label: "Contact", href: "/account" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-sm text-[#c8b89a] hover:text-[#f0e8d6] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-4">MATERIALS</p>
            <div className="flex flex-col gap-3">
              {["copper", "brass", "bronze", "kansa", "iron", "terracotta"].map((m) => (
                <Link
                  key={m}
                  to={`/materials/${m}`}
                  className="text-sm text-[#c8b89a] hover:text-[#f0e8d6] transition-colors capitalize"
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "#2e2820" }}
        >
          <p className="text-xs text-[#4a3f34] tracking-widest">
            © 2024 SATTVA CLOUD ANGADI. HERITAGE COMMERCE.
          </p>
          <p className="text-xs text-[#4a3f34]">
            Made with reverence for Indian craft traditions.
          </p>
        </div>
      </div>
    </footer>
  );
}
