import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "DISCOVER", href: "/" },
  { label: "MATERIALS", href: "/materials" },
  { label: "PRODUCTS", href: "/products" },
  { label: "ARTISANS", href: "/artisans" },
  { label: "RITUALS", href: "/rituals" },
  { label: "ROOTS", href: "/roots" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(14,12,10,0.94)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(46,40,32,0.6)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col leading-none group"
          >
            <span
              className="font-['Fraunces'] text-base md:text-lg tracking-[0.12em]"
              style={{ color: "#b87333" }}
            >
              SATTVA
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#7a6a58] -mt-0.5">
              CLOUD ANGADI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-[11px] tracking-[0.2em] font-medium transition-colors duration-200 relative group"
                style={{
                  color: isActive(link.href) ? "#b87333" : "#c8b89a",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-[#b87333] transition-all duration-300"
                  style={{ width: isActive(link.href) ? "100%" : "0%" }}
                />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <Link
              to="/products"
              className="hidden md:flex items-center gap-1 text-[#7a6a58] hover:text-[#f0e8d6] transition-colors"
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishCount > 0 && (
                <span className="text-[10px] text-[#b87333]">{wishCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-1 text-[#7a6a58] hover:text-[#f0e8d6] transition-colors relative"
              aria-label="Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium"
                  style={{ background: "#b87333", color: "#0e0c0a" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to={isLoggedIn ? "/account" : "/login"}
              className="hidden md:flex text-[#7a6a58] hover:text-[#f0e8d6] transition-colors"
              aria-label="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="flex md:hidden flex-col gap-1 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span
                className="block w-5 h-px bg-[#f0e8d6] transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
                }}
              />
              <span
                className="block w-4 h-px bg-[#f0e8d6] transition-all duration-300"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px bg-[#f0e8d6] transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col md:hidden transition-all duration-500"
        style={{
          background: "#0e0c0a",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-['Fraunces'] text-4xl transition-all duration-300"
              style={{
                color: isActive(link.href) ? "#b87333" : "#f0e8d6",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="flex items-center gap-8 mt-4"
            style={{ opacity: mobileOpen ? 1 : 0, transition: "opacity 0.5s 0.4s" }}
          >
            <Link to="/cart" className="text-[#7a6a58] text-sm tracking-widest">
              CART {cartCount > 0 && `(${cartCount})`}
            </Link>
            <Link to={isLoggedIn ? "/account" : "/login"} className="text-[#7a6a58] text-sm tracking-widest">
              ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
