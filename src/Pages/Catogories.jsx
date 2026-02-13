import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="py-16 bg-black">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-12 text-white">
        What Are You Looking For?
        <div className="mx-auto mt-3 h-1 w-24 bg-yellow-400"></div>
      </h1>

      {/* Categories Wrapper */}
      <div className="flex justify-center items-start gap-8 flex-wrap">

        {/* Protein */}
        <div onClick={()=>navigate("/wheyprotien")} className=" cursor-pointer flex flex-col items-center w-72  border-amber-400 rounded-xl overflow-hidden bg-black hover:scale-105 transform transition duration-300">
          <div className="w-full h-60 overflow-hidden flex items-center justify-center">
            <img
              src="/catogories/cato9.webp"
              alt="protein"
             className="w-60 h-53 rounded-lg object-cover"
            />
          </div>
          <h2 className="mt-4 mb-4 text-white font-bold uppercase text-center">
            Protein Powders
          </h2>
        </div>

        {/* Creatine */}
        <div onClick={()=>navigate("/creatin")} className="flex flex-col items-center w-72  border-amber-400 rounded-xl overflow-hidden bg-black hover:scale-105 transform transition duration-300">
          <div className="w-full h-60 overflow-hidden flex items-center justify-center">
            <img
              src="/catogories/cato2.webp"
              alt="creatine"
              className="w-60 h-50 rounded-lg object-cover"
            />
          </div>
          <h2 className="mt-4 mb-4 text-white font-bold uppercase text-center">
            Creatine
          </h2>
        </div>

        {/* Pre Workouts */}
        <div onClick={()=>navigate("/preworkout")} className="flex flex-col items-center w-72  border-amber-400 rounded-xl overflow-hidden bg-black hover:scale-105 transform transition duration-300">
       <div className="w-full h-60 overflow-hidden flex items-center justify-center">
            <img
              src="/catogories/cato7.webp"
              alt="preworkout"
               className="w-50 h-50 rounded-lg object-cover"
            />
          </div>
          <h2 className="mt-4 mb-4 text-white font-bold uppercase text-center">
            Pre Workouts
          </h2>
        </div>

        {/* multivitamins */}
        <div onClick={()=>navigate("multivitamin")} className="flex flex-col items-center w-72  border-amber-400 rounded-xl overflow-hidden bg-black hover:scale-105 transform transition duration-300">
          <div className="w-full h-63  flex items-center justify-center">
            <img
              src="/catogories/cato8.webp"
              alt="multivitamins"
             className="w-45 h-50 rounded-lg object-cover"
            />
          </div>
          <h2 className="mt-4 mb-4 text-white font-bold uppercase text-center">
            Multivitamins
          </h2>
        </div>

      </div>
    </div>
  );
};

export default Categories;
