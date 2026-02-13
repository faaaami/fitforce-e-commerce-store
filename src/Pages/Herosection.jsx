import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <div id="hero" className="relative w-full h-screen overflow-hidden">
      
      {/* background video */}
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src="/Hero/onbanner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* overlay */}
      <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Premium Fitness Supplements
        </h1>

        <p className="text-lg md:text-xl text-yellow-400 mt-3 drop-shadow-md">
          Fuel your strength with quality protein
        </p>

        <button onClick={()=>navigate("/products")} className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition">
          Shop Now
        </button>
      </div>

    </div>
  );
};

export default HeroSection;
