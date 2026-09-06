import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import MaterialDetail from "./pages/MaterialDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Artisans from "./pages/Artisans";
import Rituals from "./pages/Rituals";
import Roots from "./pages/Roots";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

function Root() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Pages that need a full-height layout without footer
  const noFooter = ["/login", "/register", "/roots"].includes(location.pathname);

  return (
    <div
      className="min-h-screen"
      style={{
        opacity: 1,
        animation: "page-fade-in 0.4s ease",
      }}
    >
      <style>{`
        @keyframes page-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!noFooter && <Footer />}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "materials", Component: Materials },
      { path: "materials/:slug", Component: MaterialDetail },
      { path: "products", Component: Products },
      { path: "products/:slug", Component: ProductDetail },
      { path: "artisans", Component: Artisans },
      { path: "artisans/:id", Component: Artisans },
      { path: "rituals", Component: Rituals },
      { path: "rituals/:id", Component: Rituals },
      { path: "roots", Component: Roots },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "account", Component: Account },
      { path: "*", Component: NotFound },
    ],
  },
]);
