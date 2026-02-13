import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // Import Auth to get user ID
import api from "../Services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Helper function to sync cart with API
  const syncCartToDB = async (updatedCart) => {
    if (user) {
      try {
        await api.patch(`/users/${user.id}`, { cart: updatedCart });
      } catch (err) {
        console.error("Failed to sync cart to server:", err);
      }
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let newCart;

      if (existing) {
        newCart = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      
      syncCartToDB(newCart);
      return newCart;
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const newCart = prev.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      syncCartToDB(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      syncCartToDB(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    syncCartToDB([]);
    localStorage.removeItem("cart");
  };

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);