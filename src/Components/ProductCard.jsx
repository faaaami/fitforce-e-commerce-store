import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../Contexts/CartContext.jsx";
import { useWishlist } from "../Contexts/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);

  if (!product) return null;

  // sync wishlist state
  useEffect(() => {
    const exists = wishlist.some((item) => item.id === product.id);
    setLiked(exists);
  }, [wishlist, product.id]);

  // add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);

    toast.success("Added to cart 🛒", {
      autoClose: 2000,
    });
  };

  // ✅ buy now
  const handleBuyNow = (e) => {
    e.stopPropagation();

    toast.success("Proceeding to checkout ⚡", {
      autoClose: 1500,
    });

    navigate("/checkout", {
      state: {
        buyNowProduct: {
          ...product,
          quantity: 1,
        },
      },
    });
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer
                 flex flex-col h-full border border-gray-200"
    >
      {/* image */}
      <div className="relative flex items-center justify-center h-72 rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-44 h-60 object-contain"
        />

        {/* wishlist */}
        <AiOutlineHeart
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 text-xl p-1 rounded-full transition
            ${
              liked
                ? "bg-red-500 text-white"
                : "bg-black/70 text-white hover:text-yellow-400"
            }`}
        />
      </div>

      {/* content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-black">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>

        <span className="font-bold text-yellow-500 text-xl mt-3">
          ₹{product.price}
        </span>

       
        <div className="flex gap-3 mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2
                       bg-black text-yellow-400 py-2 rounded-lg
                       hover:bg-yellow-400 hover:text-black transition font-semibold"
          >
            <FaShoppingCart />
            Add
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2
                       border-2 border-black text-black py-2 rounded-lg
                       hover:bg-black hover:text-yellow-400 transition font-semibold"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
