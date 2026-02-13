import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { useAuth } from "../Contexts/AuthContext";
import Navbar from "../Components/Navbar";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { addOrder } = useAuth();

  const buyNowProduct = location.state?.buyNowProduct;

  const products = buyNowProduct
    ? [buyNowProduct]
    : cart && cart.length > 0
    ? cart
    : [];

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const delivery = subtotal > 2000 ? 0 : 99;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    // Validation
    if (products.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (Object.values(address).some((val) => val.trim() === "")) {
      alert("Please fill all address details");
      return;
    }

    const orderData = {
      id: Date.now(),
      items: products,
      address,
      paymentMethod,
      subtotal,
      delivery,
      total,
      status: "placed",
      date: new Date().toLocaleString(),
    };

    // 1. Process Order
    await addOrder(orderData);

    // 2. Clear Cart if it wasn't a "Buy Now" single purchase
    if (!buyNowProduct) {
      clearCart();
    }

    // 3. Navigate
    navigate("/ordersuccess")
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        No items to checkout
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            {Object.keys(address).map((field) => (
              <input
                key={field}
                placeholder={field.toUpperCase()}
                className="w-full border rounded px-3 py-2 mb-3"
                value={address[field]}
                onChange={(e) =>
                  setAddress({ ...address, [field]: e.target.value })
                }
              />
            ))}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI / Online Payment
            </label>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-xl shadow p-6 sticky top-20 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {products.map((item) => (
            <div key={item.id} className="flex gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-contain border rounded"
              />
              <div className="flex-grow">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
              </div>
              <p className="font-bold">₹{item.price * (item.quantity || 1)}</p>
            </div>
          ))}

          <hr className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 bg-black text-yellow-400 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;