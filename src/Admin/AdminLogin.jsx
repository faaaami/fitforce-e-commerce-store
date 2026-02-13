import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api"; // keep your path same

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get("/users");
      const users = res.data;

      const admin = users.find(
        (u) =>
          u.email === form.email &&
          u.password === form.password &&
          u.role === "admin"
      );

      if (!admin) {
        alert("Invalid admin credentials");
        return;
      }

      localStorage.setItem("adminUser", JSON.stringify(admin));
      alert("Welcome Admin ");
      navigate("/admin/dashboard  ");
    } catch (err) {
      console.log("Admin login error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-yellow-400">
        <h1 className="text-3xl font-extrabold text-center mb-2">
          <span className="text-black">Admin</span>{" "}
          <span className="text-yellow-500">Login</span>
        </h1>

        <p className="text-center text-gray-500 text-sm mb-8">
          Sign in to manage FITFORCE dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@email.com"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300
                         focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300
                         focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-yellow-400 py-3 rounded-lg font-semibold
                       hover:bg-yellow-400 hover:text-black transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login as Admin"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 text-sm text-gray-500 hover:text-black transition"
        >
          ← Back to Store
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;