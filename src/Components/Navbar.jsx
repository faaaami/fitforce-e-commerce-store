import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../Contexts/CartContext";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const cartCount = cart.length;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="w-full h-16 bg-black border-b border-yellow-400 flex items-center px-10">

      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-yellow-400 font-extrabold text-2xl tracking-wide cursor-pointer"
      >
        FITFORCE
      </h1>

      {/* Links + Search */}
      <ul className="flex gap-10 mx-auto text-white font-semibold items-center">

        <li
          className="cursor-pointer hover:text-yellow-400 transition"
          onClick={() => navigate("/")}
        >
          HOME
        </li>

        <li
          className="cursor-pointer hover:text-yellow-400 transition"
          onClick={() => navigate("/products")}
        >
          PRODUCTS
        </li>
        <li
          className="cursor-pointer hover:text-yellow-400 transition"
          onClick={() => navigate("/contact")}
        >
          CONTACT
        </li>
       

        {/* Search Bar */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search supplements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="
              w-full pl-10 pr-4 py-2
              rounded-full
              bg-black
              border border-gray-700
              text-white
              placeholder-gray-500
              focus:border-yellow-400
              focus:ring-1 focus:ring-yellow-400
              outline-none
              transition
            "
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

      </ul>

      {/* icons */}
      <div className="flex items-center gap-6 text-white text-xl mr-6">

        <AiOutlineHeart
          onClick={() => navigate("/wishlist")}
          className="cursor-pointer hover:text-yellow-400 transition"
        />

        <div
          className="relative cursor-pointer hover:text-yellow-400 transition"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </div>

        <MdPerson
          onClick={() => navigate("/profile")}
          className="cursor-pointer hover:text-yellow-400 transition"
        />
      </div>

     {/* login */}
      {!user && (
        <button
          onClick={() => navigate("/login")}
          className="
            border border-yellow-400
            text-yellow-400
            px-5 py-1.5
            rounded-full
            font-semibold
            hover:bg-yellow-400 hover:text-black
            transition
          "
        >
          LOGIN
        </button>
      )}

    </nav>
  );
};

export default Navbar;
