import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* brand */}
        <div>
          <h2 className="text-yellow-400 font-extrabold text-xl">
            FITFORCE
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            Premium fitness supplements & gear to power your journey.
          </p>
        </div>

        {/* links */}
        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li onClick={() => navigate("/")} className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li onClick={() => navigate("/products")} className="hover:text-yellow-400 cursor-pointer">Products</li>
            <li onClick={() => navigate("/about")} className="hover:text-yellow-400 cursor-pointer">About</li>
            <li onClick={() => navigate("/contact")} className="hover:text-yellow-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* categories */}
        <div>
          <h3 className="font-bold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li onClick={()=>navigate("/wheyprotien")} className=" hover:text-yellow-400 cursor-pointer">Whey Protein</li>
            <li onClick={()=>navigate("/creatin")} className=" hover:text-yellow-400 cursor-pointer">Creatine</li>
            <li onClick={()=>navigate("/preworkout")} className=" hover:text-yellow-400 cursor-pointer">Pre Workout</li>
            <li onClick={()=>navigate("/multivitamin")} className=" hover:text-yellow-400 cursor-pointer">Multivitamin</li>
          </ul>
        </div>

        {/* social links */}
        <div>
          <h3 className="font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl text-gray-400">
            <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
            <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} FITFORCE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
