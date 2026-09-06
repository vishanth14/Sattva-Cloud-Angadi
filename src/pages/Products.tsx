import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import type { Product } from "../types";

const MATERIALS = ["All", "Copper", "Brass", "Bronze", "Kansa", "Iron", "Terracotta"];
const CATEGORIES = ["All", "wellness", "cooking", "dining", "ritual", "home"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
];

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.slug);

  return (
    <article
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.slug}`)}
      data-cursor="view"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            filter: "brightness(0.65) saturate(0.7)",
          }}
        />

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-colors"
          style={{ background: "rgba(14,12,10,0.7)" }}
          onClick={(e) => { e.stopPropagation(); toggle(product); }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#b87333" : "none"} stroke="#b87333" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: "rgba(14,12,10,0.5)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <span
            className="text-xs tracking-[0.25em] px-6 py-2 border"
            style={{ borderColor: "#f0e8d6", color: "#f0e8d6" }}
          >
            VIEW OBJECT
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="text-[10px] tracking-[0.2em] text-[#7a6a58] mb-1">
          {product.material.toUpperCase()} · {product.region}
        </p>
        <p className="text-sm text-[#f0e8d6] mb-2 leading-snug">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className="w-2 h-2 rounded-full"
                style={{ background: s <= Math.round(product.rating) ? "#b87333" : "#2e2820" }}
              />
            ))}
          </div>
          <span className="text-[10px] text-[#4a3f34]">({product.ratingCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-['Fraunces'] text-xl" style={{ color: "#b87333" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
            }}
            className="text-[10px] tracking-[0.15em] px-4 py-2 border transition-all duration-200 hover:bg-[#b87333] hover:border-[#b87333] hover:text-[#0e0c0a]"
            style={{ borderColor: "#2e2820", color: "#c8b89a" }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const [search, setSearch] = useState("");
  const [material, setMaterial] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(10000);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
      );
    }

    if (material !== "All") list = list.filter((p) => p.material === material);
    if (category !== "All") list = list.filter((p) => p.category === category);
    list = list.filter((p) => p.price <= maxPrice);

    if (sort === "featured") list = list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sort === "price_asc") list = list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list = list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [search, material, category, sort, maxPrice]);

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-36 pb-12 px-8 md:px-16">
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">PRODUCT DISCOVERY</p>
        <h1 className="font-['Fraunces'] text-5xl md:text-7xl" style={{ color: "#f0e8d6" }}>
          THE OBJECTS
        </h1>
        <p className="mt-4 text-sm text-[#c8b89a]">
          {filtered.length} {filtered.length === 1 ? "object" : "objects"} found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-0">
        {/* Filters sidebar */}
        <aside
          className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r px-8 lg:px-8 pb-8 lg:pb-0 lg:min-h-screen lg:sticky lg:top-20"
          style={{ borderColor: "#2e2820" }}
        >
          <div className="pt-0 lg:pt-8 flex flex-col gap-8">
            {/* Search */}
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-3">SEARCH</p>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Copper, brass, Rajasthan..."
                className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-2.5 placeholder-[#4a3f34] focus:outline-none"
                style={{ borderColor: "#2e2820" }}
              />
            </div>

            {/* Material */}
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-3">MATERIAL</p>
              <div className="flex flex-wrap gap-2">
                {MATERIALS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMaterial(m)}
                    className="text-[10px] tracking-widest px-3 py-1.5 border transition-all duration-200"
                    style={{
                      borderColor: material === m ? "#b87333" : "#2e2820",
                      color: material === m ? "#b87333" : "#7a6a58",
                      background: material === m ? "rgba(184,115,51,0.1)" : "transparent",
                    }}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-3">CATEGORY</p>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className="text-left text-xs tracking-widest transition-colors duration-200"
                    style={{ color: category === c ? "#b87333" : "#7a6a58" }}
                  >
                    {c === "All" ? "ALL" : c.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-3">
                PRICE UP TO ₹{maxPrice.toLocaleString("en-IN")}
              </p>
              <input
                type="range"
                min={500}
                max={10000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#b87333]"
                aria-label="Maximum price"
              />
              <div className="flex justify-between text-[10px] text-[#4a3f34] mt-1">
                <span>₹500</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-3">SORT BY</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-[#0e0c0a] border text-xs text-[#c8b89a] px-3 py-2 focus:outline-none"
                style={{ borderColor: "#2e2820" }}
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <main className="flex-1 px-8 md:px-12 py-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32">
              <p className="font-['Fraunces'] text-3xl text-[#f0e8d6] mb-4">No objects found.</p>
              <p className="text-sm text-[#7a6a58] mb-8">Try adjusting your filters.</p>
              <button
                onClick={() => { setSearch(""); setMaterial("All"); setCategory("All"); setMaxPrice(10000); }}
                className="text-xs tracking-widest text-[#b87333] border border-[#b87333] px-6 py-3"
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
