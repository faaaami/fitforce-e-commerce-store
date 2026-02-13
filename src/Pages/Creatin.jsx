import React, { useEffect, useState } from "react";
import api from "../Services/Api";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";

const Creatin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const creatinProducts = products.filter(
    (item) => item.category === "creatine"
  );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white px-10 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Creatine Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {creatinProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Creatin;
