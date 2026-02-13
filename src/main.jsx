import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Contexts/CartContext.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { WishlistProvider } from "./Contexts/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>,
);
