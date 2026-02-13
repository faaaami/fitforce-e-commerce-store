import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const OrderSuccess = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-600 text-white text-5xl mb-6">
        ✓
      </div>

      <h1 className="text-3xl font-bold mb-2">
        Order Placed Successfully
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Thank you for your purchase. Your order is being processed.
      </p>

      <Link
        to="/products"
        className="bg-black text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
      >
        Continue Shopping
      </Link>
    </div>
    </>
  );
};

export default OrderSuccess;
