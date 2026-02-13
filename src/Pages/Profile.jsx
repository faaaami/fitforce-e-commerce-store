import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { user, orders, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ safer than navigate() inside render
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white flex">
        {/* LEFT */}
        <div className="w-72 border-r border-yellow-400 p-6">
          <div className="space-y-4">
            <p className="font-semibold text-yellow-400">My Account</p>

            <p
              onClick={() => navigate("/products")}
              className="text-gray-400 cursor-pointer hover:text-white transition"
            >
              Shop
            </p>

            <p
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-red-500 cursor-pointer mt-6 hover:text-red-400 transition"
            >
              Logout
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-8">
            Welcome, <span className="text-yellow-400">{user.name}</span>
          </h1>

          {/* PROFILE INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-yellow-400 rounded-xl p-6 mb-10">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-gray-400">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-400">Phone</p>
              <p className="font-semibold">{user.phone}</p>
            </div>
          </div>

          {/* ORDERS */}
          <h2 className="text-2xl font-bold mb-4">
            My <span className="text-yellow-400">Orders</span>
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  onClick={() => navigate(`/orderdetails/${order.id}`)}
                  className="border border-gray-700 rounded-xl p-5 hover:border-yellow-400 transition cursor-pointer"
                >
                  <p className="font-bold mb-1">Order #{index + 1}</p>

                  <p className="text-gray-400 text-sm">
                    Items: {order.items ? order.items.length : 0}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Total: ₹{order.total}
                  </p>

                  <p className="text-gray-400 text-xs mt-1">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "—"}
                  </p>

                  <div className="mt-3">
                    <span className="inline-flex bg-black text-yellow-400 border border-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {order.status || "Placed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;