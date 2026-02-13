import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, decreaseQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Your cart is empty 
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow flex items-center justify-between"
          >
            {/* left */}
            <div className="flex items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />

              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>

            {/* right */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-300 rounded text-lg"
              >
                - 
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                onClick={() => addToCart(item)}
                className="px-3 py-1 bg-green-500 text-white rounded text-lg"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10">
        Total: ₹{totalPrice}
      </h2>
      <button
  onClick={() => navigate("/checkout")}
  className="w-full bg-black text-yellow-400 py-3 rounded font-bold mt-6"
>
  Proceed to Checkout
</button>
    </div>
    </>
  );
};

export default Cart;

