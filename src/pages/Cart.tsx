import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toggle } = useWishlist();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ background: "#0e0c0a" }}>
        <p className="font-['Fraunces'] text-5xl text-[#f0e8d6] mb-4">Your cart</p>
        <p className="font-['Fraunces'] text-5xl mb-8" style={{ color: "#b87333" }}>is empty.</p>
        <p className="text-sm text-[#7a6a58] mb-10">Discover objects with centuries of heritage waiting to be part of your life.</p>
        <button
          onClick={() => navigate("/products")}
          className="px-10 py-4 text-xs tracking-[0.2em]"
          style={{ background: "#b87333", color: "#0e0c0a" }}
        >
          EXPLORE OBJECTS
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      <div className="pt-36 pb-16 px-8 md:px-16">
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">YOUR CART</p>
        <h1 className="font-['Fraunces'] text-5xl md:text-6xl" style={{ color: "#f0e8d6" }}>
          {items.length} {items.length === 1 ? "OBJECT" : "OBJECTS"}
        </h1>
      </div>

      <div className="px-8 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-0">
          {items.map((item) => (
            <div
              key={item.product.slug}
              className="flex gap-6 py-8 border-b"
              style={{ borderColor: "#2e2820" }}
            >
              <div
                className="w-24 h-32 shrink-0 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/products/${item.product.slug}`)}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.7) saturate(0.7)" }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-widest text-[#7a6a58] mb-1">
                    {item.product.material.toUpperCase()} · {item.product.region}
                  </p>
                  <p
                    className="text-sm text-[#f0e8d6] mb-1 cursor-pointer hover:text-[#b87333] transition-colors"
                    onClick={() => navigate(`/products/${item.product.slug}`)}
                  >
                    {item.product.name}
                  </p>
                  <p className="font-['Fraunces'] text-xl" style={{ color: "#b87333" }}>
                    ₹{item.product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border" style={{ borderColor: "#2e2820" }}>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-[#c8b89a] hover:text-[#f0e8d6]"
                      onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                      aria-label="Decrease"
                    >−</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-[#c8b89a] hover:text-[#f0e8d6]"
                      onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                      aria-label="Increase"
                    >+</button>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => toggle(item.product)}
                      className="text-[10px] tracking-widest text-[#7a6a58] hover:text-[#b87333] transition-colors"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => removeItem(item.product.slug)}
                      className="text-[10px] tracking-widest text-[#7a6a58] hover:text-[#f0e8d6] transition-colors"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-['Fraunces'] text-xl text-[#f0e8d6]">
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-6 flex justify-between">
            <button
              onClick={() => navigate("/products")}
              className="text-xs tracking-widest text-[#7a6a58] hover:text-[#f0e8d6] transition-colors"
            >
              ← CONTINUE SHOPPING
            </button>
            <button
              onClick={clearCart}
              className="text-xs tracking-widest text-[#7a6a58] hover:text-[#f0e8d6] transition-colors"
            >
              CLEAR CART
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border p-8 sticky top-24" style={{ borderColor: "#2e2820" }}>
            <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-8">ORDER SUMMARY</p>

            <div className="flex flex-col gap-4 mb-8">
              {items.map((item) => (
                <div key={item.product.slug} className="flex justify-between text-xs">
                  <span className="text-[#c8b89a]">{item.product.name} × {item.quantity}</span>
                  <span className="text-[#f0e8d6]">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 mb-6" style={{ borderColor: "#2e2820" }}>
              <div className="flex justify-between mb-2 text-xs">
                <span className="text-[#7a6a58]">Subtotal</span>
                <span className="text-[#f0e8d6]">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between mb-2 text-xs">
                <span className="text-[#7a6a58]">Shipping</span>
                <span className="text-[#b87333]">{total >= 3000 ? "FREE" : "₹150"}</span>
              </div>
              {total < 3000 && (
                <p className="text-[10px] text-[#4a3f34] mt-2">
                  Add ₹{(3000 - total).toLocaleString("en-IN")} more for free shipping
                </p>
              )}
            </div>

            <div className="flex justify-between mb-8">
              <span className="font-['Fraunces'] text-lg text-[#f0e8d6]">TOTAL</span>
              <span className="font-['Fraunces'] text-2xl" style={{ color: "#b87333" }}>
                ₹{(total + (total >= 3000 ? 0 : 150)).toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 text-sm tracking-[0.2em] font-medium transition-opacity hover:opacity-90"
              style={{ background: "#b87333", color: "#0e0c0a" }}
            >
              PROCEED TO CHECKOUT
            </button>
            <p className="text-[10px] text-center text-[#4a3f34] mt-4">
              Free delivery on orders above ₹3,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
