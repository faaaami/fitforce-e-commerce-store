import React, { useState, useEffect } from "react";
import api from "../Services/Api";
import ProductCard from "../Components/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/featuredproducts");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-10 py-16 bg-black">

      {/* Section Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-white">
        Featured <span className="text-yellow-400">Products</span>
        <div className="mx-auto mt-4 h-1 w-24 bg-yellow-400"></div>
      </h1>

      {/* products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="hover:scale-105 transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default FeaturedProducts;
