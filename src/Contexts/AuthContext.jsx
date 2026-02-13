import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../Services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ orders are NOT inside user anymore (they are in /orders)
  const [orders, setOrders] = useState([]);

  // ✅ fetch orders for logged user
  const fetchMyOrders = async (userId) => {
    try {
      const res = await api.get(`/orders?userId=${userId}`);
      setOrders(res.data || []);
    } catch (err) {
      console.log("Error fetching orders:", err);
      setOrders([]);
    }
  };

  // ✅ when app loads and user exists -> fetch orders
  useEffect(() => {
    if (user?.id) {
      fetchMyOrders(user.id);
    } else {
      setOrders([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // ✅ LOGIN
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData));

    // fetch orders for this user
    if (userData?.id) fetchMyOrders(userData.id);
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem("loggedUser");
  };

  // ✅ ADD ORDER -> save into /orders (NOT /users)
 const addOrder = async (order) => {
  if (!user) {
    alert("Please login first");
    return;
  }

  const orderData = {
    ...order,

    // ✅ FORCE ORDER ID AS STRING
    id: String(Date.now()),

    // ✅ FORCE USER ID AS STRING
    userId: String(user.id),

    // snapshot for admin
    userSnapshot: {
      id: String(user.id),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };

  try {
    const res = await api.post("/orders", orderData);
    setOrders((prev) => [...prev, res.data]);
  } catch (err) {
    console.error("Error placing order:", err);
  }
};

  // ✅ CANCEL ORDER -> update order status in /orders
  const cancelOrder = async (orderId) => {
    if (!user) return;

    try {
      await api.patch(`/orders/${orderId}`, { status: "cancelled" });

      // ✅ update local orders state
      setOrders((prev) =>
        prev.map((o) =>
          String(o.id) === String(orderId) ? { ...o, status: "cancelled" } : o
        )
      );
    } catch (err) {
      console.log("Error cancelling order:", err);
      alert("Cancel failed. Try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        logout,
        addOrder,
        cancelOrder,
        fetchMyOrders, // optional (useful for refresh)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);