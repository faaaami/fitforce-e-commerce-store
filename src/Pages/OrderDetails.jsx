import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useAuth();

  const order = orders.find(o => String(o.id) === String(id));

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <p className="text-red-500 text-xl">Order not found</p>
        <button
          onClick={() => navigate("/profile")}
          className="mt-4 text-yellow-400 hover:underline"
        >
          Back to Profile
        </button>
      </div>
    );
  }

  const handleCancel = () => {
    cancelOrder(order.id);

    toast.error("Order cancelled ❌", {
      autoClose: 2000,
    });

    navigate("/profile");
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Order <span className="text-yellow-400">#{order.id}</span>
        </h1>

        {/* status */}
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold
            ${
              order.status === "cancelled"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-black"
            }`}
        >
          {order.status}
        </span>
      </div>

      <p className="text-gray-400 mb-2">Date: {order.date}</p>
      <p className="text-gray-400 mb-6">Total: ₹{order.total}</p>

      <h2 className="text-xl font-bold mb-4">Items</h2>

      <div className="space-y-4 mb-8">
        {order.items.map(item => (
          <div
            key={item.id}
            className="border border-gray-700 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-semibold">₹{item.price}</p>
          </div>
        ))}
      </div>

      {/* cancel button */}
      {order.status !== "cancelled" && (
        <button
          onClick={handleCancel}
          className="bg-red-600 px-6 py-2 rounded-lg font-semibold
                     hover:bg-red-700 transition"
        >
          Cancel Order
        </button>
      )}

      {order.status === "cancelled" && (
        <p className="text-red-500 font-semibold">
          This order has been cancelled.
        </p>
      )}
    </div>
    </>
  );
};

export default OrderDetails;
