import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Services/Api";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../Contexts/CartContext.jsx";
import Navbar from "../Components/Navbar.jsx";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products?id=${id}`);
        setProduct(res.data[0]);
      } catch (err) {
        console.log("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 px-10 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-lg">

        {/* image */}
        <div className="h-[550px] flex items-center justify-center bg-white rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-96 h-full object-contain"
          />
        </div>

        {/* info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-2xl font-bold text-yellow-500">
            ₹{product.price}
          </p>

          {/* action buttns */}
          <div className="flex gap-4">

            {/* add to cart */}
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-3 bg-black text-yellow-400 px-8 py-3 rounded-lg
                         hover:bg-yellow-400 hover:text-black transition font-semibold"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            {/* buy now*/}
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { buyNowProduct: { ...product, quantity: 1 } },
                })
              }
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg
                         hover:bg-black hover:text-yellow-400 transition font-semibold"
            >
              Buy Now
            </button>

          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default ProductDetails;
