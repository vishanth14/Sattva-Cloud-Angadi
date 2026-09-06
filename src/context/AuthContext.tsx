import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, Order } from "../types";

const DEMO_USERS: User[] = [
  {
    id: "u1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    password: "password",
    orders: [],
    recentlyViewed: ["heritage-copper-bottle", "kansa-bowl"],
    ritualInterests: ["wellness", "puja"],
    preferredMaterials: ["copper", "kansa"],
  },
];

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addOrder: (order: Order) => void;
  addRecentlyViewed: (slug: string) => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("sattva_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem("sattva_users");
      return stored ? JSON.parse(stored) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("sattva_user", JSON.stringify(user));
    else localStorage.removeItem("sattva_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("sattva_users", JSON.stringify(users));
  }, [users]);

  const login = (email: string, password: string) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      orders: [],
      recentlyViewed: [],
      ritualInterests: [],
      preferredMaterials: [],
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const addOrder = (order: Order) => {
    if (!user) return;
    const updated = { ...user, orders: [...user.orders, order] };
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
  };

  const addRecentlyViewed = (slug: string) => {
    if (!user) return;
    const viewed = [slug, ...user.recentlyViewed.filter((s) => s !== slug)].slice(0, 10);
    const updated = { ...user, recentlyViewed: viewed };
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, addOrder, addRecentlyViewed, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
