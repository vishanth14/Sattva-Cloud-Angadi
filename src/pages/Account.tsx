import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getProduct } from "../data/products";
import { products } from "../data/products";

export default function Account() {
  const { user, logout, isLoggedIn } = useAuth();
  const { items: wishlist, toggle } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ background: "#0e0c0a" }}>
        <p className="font-['Fraunces'] text-4xl text-[#f0e8d6] mb-4">Your account</p>
        <p className="font-['Fraunces'] text-4xl mb-8" style={{ color: "#b87333" }}>awaits.</p>
        <div className="flex gap-3">
          <button onClick={() => navigate("/login")} className="px-8 py-4 text-xs tracking-[0.2em]" style={{ background: "#b87333", color: "#0e0c0a" }}>SIGN IN</button>
          <button onClick={() => navigate("/register")} className="px-8 py-4 text-xs tracking-[0.2em] border" style={{ borderColor: "#2e2820", color: "#c8b89a" }}>CREATE ACCOUNT</button>
        </div>
      </div>
    );
  }

  // Recommendation logic
  const preferred = user?.preferredMaterials || [];
  const recentSlugs = user?.recentlyViewed || [];
  const recommended = products
    .filter((p) => preferred.includes(p.materialSlug) || recentSlugs.includes(p.slug))
    .filter((p) => !wishlist.find((w) => w.slug === p.slug))
    .slice(0, 4);
  const fallback = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-36 pb-16 px-8 md:px-16 border-b" style={{ borderColor: "#2e2820" }}>
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">YOUR ACCOUNT</p>
        <h1 className="font-['Fraunces'] text-5xl md:text-6xl" style={{ color: "#f0e8d6" }}>
          WELCOME BACK,
          <br />
          <span style={{ color: "#b87333" }}>{user?.name.toUpperCase().split(" ")[0]}.</span>
        </h1>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="mt-6 text-xs tracking-widest text-[#7a6a58] hover:text-[#f0e8d6] transition-colors"
        >
          SIGN OUT
        </button>
      </div>

      <div className="px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* Profile card */}
          <div className="border p-6" style={{ borderColor: "#2e2820" }}>
            <p className="text-[10px] tracking-widest text-[#7a6a58] mb-4">PROFILE</p>
            <p className="text-sm text-[#f0e8d6] mb-1">{user?.name}</p>
            <p className="text-xs text-[#7a6a58]">{user?.email}</p>
          </div>

          {/* Quick links */}
          <div className="border p-6" style={{ borderColor: "#2e2820" }}>
            <p className="text-[10px] tracking-widest text-[#7a6a58] mb-5">EXPLORE</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "YOUR MATERIALS", href: "/materials" },
                { label: "EXPLORE PRODUCTS", href: "/products" },
                { label: "RITUAL DISCOVERY", href: "/rituals" },
                { label: "ROOTS COMPANION", href: "/roots" },
                { label: "ARTISAN STORIES", href: "/artisans" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs tracking-widest text-[#c8b89a] hover:text-[#b87333] transition-colors flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-[#4a3f34]">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Wishlist */}
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">
              YOUR WISHLIST {wishlist.length > 0 && `(${wishlist.length})`}
            </p>
            {wishlist.length === 0 ? (
              <p className="text-sm text-[#4a3f34]">
                No saved objects yet.{" "}
                <Link to="/products" className="text-[#b87333] hover:underline">Explore products →</Link>
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wishlist.map((product) => (
                  <div key={product.slug} className="group cursor-pointer" onClick={() => navigate(`/products/${product.slug}`)}>
                    <div className="aspect-square overflow-hidden mb-2 relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={{ filter: "brightness(0.65) saturate(0.7)" }} />
                      <button
                        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                        style={{ background: "rgba(14,12,10,0.8)" }}
                        onClick={(e) => { e.stopPropagation(); toggle(product); }}
                        aria-label="Remove from wishlist"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#b87333" stroke="#b87333" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-[#f0e8d6] mb-1">{product.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs" style={{ color: "#b87333" }}>₹{product.price.toLocaleString("en-IN")}</p>
                      <button
                        className="text-[9px] tracking-widest text-[#7a6a58] border px-2 py-1 hover:border-[#b87333] hover:text-[#b87333] transition-colors"
                        style={{ borderColor: "#2e2820" }}
                        onClick={(e) => { e.stopPropagation(); addItem(product); toggle(product); }}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently viewed */}
          {user?.recentlyViewed && user.recentlyViewed.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">RECENTLY VIEWED</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user.recentlyViewed.slice(0, 4).map((slug) => {
                  const product = getProduct(slug);
                  if (!product) return null;
                  return (
                    <div key={slug} className="cursor-pointer group" onClick={() => navigate(`/products/${slug}`)}>
                      <div className="aspect-square overflow-hidden mb-2">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={{ filter: "brightness(0.65) saturate(0.7)" }} />
                      </div>
                      <p className="text-xs text-[#f0e8d6] mb-1">{product.name}</p>
                      <p className="text-xs" style={{ color: "#b87333" }}>₹{product.price.toLocaleString("en-IN")}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Orders */}
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">YOUR ORDERS</p>
            {(!user?.orders || user.orders.length === 0) ? (
              <p className="text-sm text-[#4a3f34]">
                No orders yet.{" "}
                <Link to="/products" className="text-[#b87333] hover:underline">Explore products →</Link>
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {user.orders.map((order) => (
                  <div key={order.id} className="border p-5" style={{ borderColor: "#2e2820" }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[10px] tracking-widest text-[#b87333] mb-1">ORDER #{order.id}</p>
                        <p className="text-xs text-[#7a6a58]">{order.date}</p>
                      </div>
                      <span className="text-[10px] tracking-widest px-2 py-1 border" style={{ borderColor: "#2e2820", color: "#7a6a58" }}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.product.slug} className="w-12 h-12 overflow-hidden">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 border flex items-center justify-center text-xs text-[#7a6a58]" style={{ borderColor: "#2e2820" }}>
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#7a6a58]">Delivery: {order.deliveryEstimate}</span>
                      <span className="font-['Fraunces']" style={{ color: "#b87333" }}>₹{order.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-6">RECOMMENDED FOR YOU</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(recommended.length > 0 ? recommended : fallback).map((product) => (
                <div key={product.slug} className="cursor-pointer group" onClick={() => navigate(`/products/${product.slug}`)}>
                  <div className="aspect-square overflow-hidden mb-2">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={{ filter: "brightness(0.65) saturate(0.7)" }} />
                  </div>
                  <p className="text-xs text-[#f0e8d6] mb-1">{product.name}</p>
                  <p className="text-xs" style={{ color: "#b87333" }}>₹{product.price.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
