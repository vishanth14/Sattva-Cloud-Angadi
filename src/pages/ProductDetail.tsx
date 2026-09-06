import { useEffect, useState } from "react";
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

  return (
    <>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,8,6,0.9)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg border relative"
            style={{ background: "#0e0c0a", borderColor: "#b87333" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Passport header */}
            <div
              className="px-8 py-6 border-b"
              style={{
                background: "linear-gradient(135deg, #1a1210 0%, #0e0c0a 100%)",
                borderColor: "#2e2820",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] tracking-[0.4em] text-[#b87333] mb-1">SATTVA CLOUD ANGADI</p>
                  <p className="text-[9px] tracking-[0.3em] text-[#7a6a58]">HERITAGE PASSPORT</p>
                </div>
                <div className="w-12 h-12 border border-[#b87333]/30 flex items-center justify-center">
                  <span className="font-['Fraunces'] text-[#b87333] text-lg">{product.material[0]}</span>
                </div>
              </div>
              <div className="h-px" style={{ background: "linear-gradient(to right, #b87333, transparent)" }} />
            </div>

            {/* Passport fields */}
            <div className="px-8 py-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {[
                  { label: "OBJECT", value: product.name },
                  { label: "MATERIAL", value: product.material },
                  { label: "REGION", value: product.region },
                  { label: "CRAFT TRADITION", value: product.artisanCommunity },
                  { label: "TRADITIONAL USE", value: product.traditionalUse.split(".")[0] },
                  { label: "PROVENANCE", value: material?.region || product.region },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-[9px] tracking-[0.25em] text-[#7a6a58] mb-1">{field.label}</p>
                    <p className="text-xs text-[#f0e8d6] leading-snug">{field.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: "#2e2820" }}>
                <p className="text-[9px] tracking-[0.25em] text-[#7a6a58] mb-2">CRAFT PROCESS</p>
                <p className="text-xs text-[#c8b89a] leading-relaxed">{product.craftProcess}</p>
              </div>

              <div className="mt-5 pt-5 border-t" style={{ borderColor: "#2e2820" }}>
                <p className="text-[9px] tracking-[0.25em] text-[#7a6a58] mb-2">CARE</p>
                <p className="text-xs text-[#c8b89a]">
                  See care guide for complete maintenance instructions for {product.material.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="px-8 pb-6 flex gap-3">
              <Link
                to={`/materials/${product.materialSlug}`}
                className="flex-1 text-center text-[10px] tracking-[0.2em] py-3 border transition-colors hover:border-[#b87333] hover:text-[#b87333]"
                style={{ borderColor: "#2e2820", color: "#7a6a58" }}
                onClick={() => setOpen(false)}
              >
                MATERIAL STORY
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 text-[10px] tracking-[0.2em] py-3 transition-colors"
                style={{ background: "#b87333", color: "#0e0c0a" }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CareModal({ materialSlug, productName }: { materialSlug: string; productName: string }) {
  const [open, setOpen] = useState(false);
  const guide = getCareGuide(materialSlug);

  if (!guide) return null;

  const sections = [
    { heading: "HOW TO USE", items: guide.howToUse },
    { heading: "HOW TO CLEAN", items: guide.howToClean },
    { heading: "HOW TO STORE", items: guide.howToStore },
    { heading: "WHAT TO AVOID", items: guide.whatToAvoid },
    { heading: "MAINTENANCE", items: guide.maintenance },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-4 border flex items-center justify-between px-6 transition-all duration-300 hover:border-[#c9a84c] group mt-3"
        style={{ borderColor: "#2e2820" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-[#c9a84c] flex items-center justify-center">
            <span className="text-[10px] text-[#c9a84c]">CG</span>
          </div>
          <div className="text-left">
            <p className="text-xs tracking-[0.2em] text-[#f0e8d6]">CARE GUIDE</p>
            <p className="text-[10px] text-[#7a6a58]">How to use, clean & maintain</p>
          </div>
        </div>
        <span className="text-[#c9a84c] text-sm group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ background: "rgba(10,8,6,0.9)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg border my-8 relative"
            style={{ background: "#0e0c0a", borderColor: "#c9a84c" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-8 py-6 border-b" style={{ borderColor: "#2e2820" }}>
              <p className="text-[10px] tracking-[0.35em] text-[#c9a84c] mb-1">CARE GUIDE</p>
              <p className="font-['Fraunces'] text-xl text-[#f0e8d6]">{productName}</p>
            </div>

            <div className="px-8 py-6 flex flex-col gap-8">
              {sections.map((section) => (
                <div key={section.heading}>
                  <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-4">{section.heading}</p>
                  <ul className="flex flex-col gap-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-xs text-[#c8b89a]">
                        <span style={{ color: "#c9a84c" }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="px-8 pb-6">
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3 text-[10px] tracking-[0.2em]"
                style={{ background: "#c9a84c", color: "#0e0c0a" }}
              >
                CLOSE
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
