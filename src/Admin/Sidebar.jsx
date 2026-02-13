import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col border-r border-yellow-400">

      {/* LOGO / TITLE */}
      <div className="px-6 py-6 border-b border-yellow-400">
        <h1
          onClick={() => navigate("/admin")}
          className="text-2xl font-extrabold text-yellow-400 cursor-pointer"
        >
          FITFORCE
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Admin Panel
        </p>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2 p-4 flex-grow">

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-left px-4 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition font-semibold"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          className="text-left px-4 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition font-semibold"
        >
          Products
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="text-left px-4 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition font-semibold"
        >
          Orders
        </button>

        <button
          onClick={() => navigate("/admin/users")}
          className="text-left px-4 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition font-semibold"
        >
          Users
        </button>

        

      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-yellow-400 text-xs text-gray-400">
        Admin Control Panel
      </div>
    </div>
  );
};

export default Sidebar;

