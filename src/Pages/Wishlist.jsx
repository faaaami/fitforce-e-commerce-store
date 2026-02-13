import React from "react";
import { useWishlist } from "../Contexts/WishlistContext";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Your wishlist is empty 
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showWishlist={true}  
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Wishlist;
