import { RouterProvider } from "react-router";
import { useState } from "react";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import CustomCursor from "./components/common/CustomCursor";
import LoadingScreen from "./components/common/LoadingScreen";
import ParticleNetwork from "./components/effects/ParticleNetwork";
import FluidCursorBlob from "./components/effects/FluidCursorBlob";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ParticleNetwork />
          <FluidCursorBlob />
          <CustomCursor />
          {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            <RouterProvider router={router} />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
