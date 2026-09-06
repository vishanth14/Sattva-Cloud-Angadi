import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import type { Order } from "../types";

const STEPS = ["01 ADDRESS", "02 DELIVERY", "03 PAYMENT", "04 REVIEW"];

interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<Address>({
    name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "",
  });
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [orderId, setOrderId] = useState("");

  if (items.length === 0 && !orderId) {
    navigate("/cart");
    return null;
  }

  const shipping = total >= 3000 ? 0 : 150;
  const grandTotal = total + shipping;

  const handlePlaceOrder = () => {
    const order: Order = {
      id: `SCA${Date.now().toString().slice(-8)}`,
      items: [...items],
      total: grandTotal,
      address: `${address.address}, ${address.city}`,
      city: address.city,
      status: "Confirmed",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      deliveryEstimate: delivery === "express"
        ? "3–5 business days"
        : "7–10 business days",
    };
    addOrder(order);
    setOrderId(order.id);
    clearCart();
  };

  // Order confirmed screen
  if (orderId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-20" style={{ background: "#0e0c0a" }}>
        <div className="w-16 h-16 border border-[#b87333] flex items-center justify-center mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b87333" strokeWidth="1.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">ORDER CONFIRMED</p>
        <h1 className="font-['Fraunces'] text-4xl md:text-6xl text-[#f0e8d6] text-center mb-2">
          Your heritage
        </h1>
        <h1 className="font-['Fraunces'] text-4xl md:text-6xl text-center mb-8" style={{ color: "#b87333" }}>
          is on its way.
        </h1>
        <p className="text-sm text-[#7a6a58] mb-2 tracking-widest">ORDER #{orderId}</p>
        <p className="text-sm text-[#c8b89a] mb-1">Total: ₹{grandTotal.toLocaleString("en-IN")}</p>
        <p className="text-sm text-[#c8b89a] mb-10">
          Delivery: {delivery === "express" ? "3–5 business days" : "7–10 business days"}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <button
            onClick={() => navigate("/account")}
            className="flex-1 py-4 text-xs tracking-[0.2em] border transition-colors hover:border-[#b87333] hover:text-[#b87333]"
            style={{ borderColor: "#2e2820", color: "#7a6a58" }}
          >
            VIEW PASSPORT
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex-1 py-4 text-xs tracking-[0.2em]"
            style={{ background: "#b87333", color: "#0e0c0a" }}
          >
            CONTINUE EXPLORING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      <div className="pt-36 pb-12 px-8 md:px-16">
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">CHECKOUT</p>

        {/* Step indicator */}
        <div className="flex gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-0"
            >
              <button
                onClick={() => i < step && setStep(i)}
                className="text-[10px] tracking-widest transition-colors"
                style={{ color: i === step ? "#b87333" : i < step ? "#c8b89a" : "#4a3f34" }}
              >
                {s}
              </button>
              {i < STEPS.length - 1 && (
                <span className="mx-4 text-[#2e2820]">—</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Step 0: Address */}
          {step === 0 && (
            <div>
              <h2 className="font-['Fraunces'] text-2xl text-[#f0e8d6] mb-8">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "FULL NAME", key: "name", placeholder: "Priya Sharma" },
                  { label: "EMAIL", key: "email", placeholder: "priya@example.com" },
                  { label: "PHONE", key: "phone", placeholder: "+91 98765 43210" },
                  { label: "PIN CODE", key: "pincode", placeholder: "110001" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px] tracking-[0.25em] text-[#7a6a58] block mb-2">{field.label}</label>
                    <input
                      type="text"
                      value={address[field.key as keyof Address]}
                      onChange={(e) => setAddress((a) => ({ ...a, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-3 placeholder-[#4a3f34] focus:outline-none focus:border-[#b87333] transition-colors"
                      style={{ borderColor: "#2e2820" }}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="text-[10px] tracking-[0.25em] text-[#7a6a58] block mb-2">ADDRESS</label>
                  <input
                    type="text"
                    value={address.address}
                    onChange={(e) => setAddress((a) => ({ ...a, address: e.target.value }))}
                    placeholder="House / Flat, Street, Area"
                    className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-3 placeholder-[#4a3f34] focus:outline-none focus:border-[#b87333] transition-colors"
                    style={{ borderColor: "#2e2820" }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.25em] text-[#7a6a58] block mb-2">CITY</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                    placeholder="Mumbai"
                    className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-3 placeholder-[#4a3f34] focus:outline-none focus:border-[#b87333] transition-colors"
                    style={{ borderColor: "#2e2820" }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.25em] text-[#7a6a58] block mb-2">STATE</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
                    placeholder="Maharashtra"
                    className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-3 placeholder-[#4a3f34] focus:outline-none focus:border-[#b87333] transition-colors"
                    style={{ borderColor: "#2e2820" }}
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                disabled={!address.name || !address.address || !address.city}
                className="mt-8 px-10 py-4 text-xs tracking-[0.2em] disabled:opacity-40 transition-opacity"
                style={{ background: "#b87333", color: "#0e0c0a" }}
              >
                CONTINUE TO DELIVERY →
              </button>
            </div>
          )}

          {/* Step 1: Delivery */}
          {step === 1 && (
            <div>
              <h2 className="font-['Fraunces'] text-2xl text-[#f0e8d6] mb-8">Delivery Method</h2>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { id: "standard", label: "Standard Delivery", sublabel: "7–10 business days", price: total >= 3000 ? "FREE" : "₹150" },
                  { id: "express", label: "Express Delivery", sublabel: "3–5 business days", price: "₹350" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDelivery(opt.id)}
                    className="flex items-center justify-between p-5 border text-left transition-colors"
                    style={{ borderColor: delivery === opt.id ? "#b87333" : "#2e2820" }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full border flex items-center justify-center"
                        style={{ borderColor: delivery === opt.id ? "#b87333" : "#2e2820" }}
                      >
                        {delivery === opt.id && <div className="w-2 h-2 rounded-full" style={{ background: "#b87333" }} />}
                      </div>
                      <div>
                        <p className="text-sm text-[#f0e8d6]">{opt.label}</p>
                        <p className="text-xs text-[#7a6a58]">{opt.sublabel}</p>
                      </div>
                    </div>
                    <span className="text-sm" style={{ color: "#b87333" }}>{opt.price}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="px-6 py-4 text-xs tracking-widest text-[#7a6a58] border" style={{ borderColor: "#2e2820" }}>← BACK</button>
                <button onClick={() => setStep(2)} className="px-10 py-4 text-xs tracking-[0.2em]" style={{ background: "#b87333", color: "#0e0c0a" }}>CONTINUE TO PAYMENT →</button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <h2 className="font-['Fraunces'] text-2xl text-[#f0e8d6] mb-8">Payment</h2>
              <p className="text-xs text-[#7a6a58] mb-6 tracking-widest">DEMO PAYMENT — NO REAL CHARGES WILL OCCUR</p>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "upi", label: "UPI" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPayment(opt.id)}
                    className="flex items-center gap-4 p-4 border text-left transition-colors"
                    style={{ borderColor: payment === opt.id ? "#b87333" : "#2e2820" }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                      style={{ borderColor: payment === opt.id ? "#b87333" : "#2e2820" }}
                    >
                      {payment === opt.id && <div className="w-2 h-2 rounded-full" style={{ background: "#b87333" }} />}
                    </div>
                    <span className="text-sm text-[#f0e8d6]">{opt.label}</span>
                  </button>
                ))}
              </div>
              {payment === "card" && (
                <div className="p-5 border mb-6" style={{ borderColor: "#2e2820" }}>
                  <label className="text-[10px] tracking-widest text-[#7a6a58] block mb-2">CARD NUMBER (DEMO)</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-transparent border text-sm text-[#f0e8d6] px-3 py-3 placeholder-[#4a3f34] focus:outline-none"
                    style={{ borderColor: "#2e2820" }}
                  />
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-4 text-xs tracking-widest text-[#7a6a58] border" style={{ borderColor: "#2e2820" }}>← BACK</button>
                <button onClick={() => setStep(3)} className="px-10 py-4 text-xs tracking-[0.2em]" style={{ background: "#b87333", color: "#0e0c0a" }}>REVIEW ORDER →</button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <h2 className="font-['Fraunces'] text-2xl text-[#f0e8d6] mb-8">Review Your Order</h2>
              <div className="flex flex-col gap-4 mb-8">
                {items.map((item) => (
                  <div key={item.product.slug} className="flex gap-4 py-4 border-b" style={{ borderColor: "#2e2820" }}>
                    <div className="w-16 h-20 overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#7a6a58] mb-1">{item.product.material}</p>
                      <p className="text-sm text-[#f0e8d6]">{item.product.name}</p>
                      <p className="text-xs text-[#7a6a58] mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-['Fraunces'] text-lg" style={{ color: "#b87333" }}>
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-5 border mb-8 grid grid-cols-2 gap-4 text-xs" style={{ borderColor: "#2e2820" }}>
                <div><p className="text-[#7a6a58] mb-1">DELIVERY TO</p><p className="text-[#c8b89a]">{address.name}, {address.city}</p></div>
                <div><p className="text-[#7a6a58] mb-1">DELIVERY METHOD</p><p className="text-[#c8b89a]">{delivery === "express" ? "Express (3–5 days)" : "Standard (7–10 days)"}</p></div>
                <div><p className="text-[#7a6a58] mb-1">PAYMENT</p><p className="text-[#c8b89a]">{payment === "card" ? "Card" : payment === "upi" ? "UPI" : "Cash on Delivery"}</p></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-4 text-xs tracking-widest text-[#7a6a58] border" style={{ borderColor: "#2e2820" }}>← BACK</button>
                <button
                  onClick={handlePlaceOrder}
                  className="px-10 py-4 text-xs tracking-[0.2em]"
                  style={{ background: "#b87333", color: "#0e0c0a" }}
                >
                  PLACE ORDER — ₹{grandTotal.toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div>
          <div className="border p-6 sticky top-24" style={{ borderColor: "#2e2820" }}>
            <p className="text-[10px] tracking-widest text-[#7a6a58] mb-6">ORDER SUMMARY</p>
            {items.map((item) => (
              <div key={item.product.slug} className="flex justify-between text-xs mb-3">
                <span className="text-[#c8b89a]">{item.product.name} × {item.quantity}</span>
                <span className="text-[#f0e8d6]">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4" style={{ borderColor: "#2e2820" }}>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#7a6a58]">Shipping</span>
                <span style={{ color: "#b87333" }}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between mt-3">
                <span className="font-['Fraunces'] text-[#f0e8d6]">TOTAL</span>
                <span className="font-['Fraunces'] text-xl" style={{ color: "#b87333" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
