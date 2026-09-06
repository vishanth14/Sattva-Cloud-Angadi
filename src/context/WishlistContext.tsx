import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../types";

interface WishlistContextValue {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (slug: string) => boolean;
  moveToCart: (slug: string, addToCart: (p: Product) => void) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem("sattva_wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("sattva_wishlist", JSON.stringify(items));
  }, [items]);

  const toggle = (product: Product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.slug === product.slug);
      return exists ? prev.filter((p) => p.slug !== product.slug) : [...prev, product];
    });
  };

  const isWishlisted = (slug: string) => items.some((p) => p.slug === slug);

  const moveToCart = (slug: string, addToCart: (p: Product) => void) => {
    const product = items.find((p) => p.slug === slug);
    if (product) {
      addToCart(product);
      setItems((prev) => prev.filter((p) => p.slug !== slug));
    }
  };

  return (
    <WishlistContext.Provider
      value={{ items, toggle, isWishlisted, moveToCart, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
};
