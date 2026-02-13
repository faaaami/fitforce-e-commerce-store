import React, { useState, useEffect } from "react";
import api from "../../Services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// ✅ Register everything needed
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);



const AdminDashboard = () => {
  const [users, Setusers] = useState([]);
  const [orders, Setorders] = useState([]);
  const [products, Setproducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get("/users");
        Setusers(usersRes.data || []);

        const ordersRes = await api.get("/orders");
        Setorders(ordersRes.data || []);

        const productsRes = await api.get("/products");
        Setproducts(productsRes.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // ✅ Total Revenue
  const TotalRevenue = orders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  // ✅ BAR CHART DATA (Store Stats)
  const chartData = {
    labels: ["Users", "Orders", "Products"],
    datasets: [
      {
        label: "Store Stats",
        data: [users.length, orders.length, products.length],
        backgroundColor: ["#facc15", "#000000", "#facc15"],
      },
    ],
  };

  // ✅ LINE CHART DATA (Revenue Trend)
  const revenueChartData = {
    labels: orders.map((_, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: "Revenue ₹",
        data: orders.map((order) => order.total || 0),
        borderColor: "#facc15",
        backgroundColor: "#facc15",
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#000",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="w-full">
     
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-black">
          Admin <span className="text-yellow-500">Dashboard</span>
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome to the admin dashboard.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6">
          <p className="text-sm text-gray-500 font-semibold">Total Users</p>
          <p className="text-4xl font-extrabold text-black mt-2">
            {users.length}
          </p>
          <div className="mt-4 h-1 w-16 bg-yellow-400 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6">
          <p className="text-sm text-gray-500 font-semibold">Total Orders</p>
          <p className="text-4xl font-extrabold text-black mt-2">
            {orders.length}
          </p>
          <div className="mt-4 h-1 w-16 bg-yellow-400 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6">
          <p className="text-sm text-gray-500 font-semibold">Total Products</p>
          <p className="text-4xl font-extrabold text-black mt-2">
            {products.length}
          </p>
          <div className="mt-4 h-1 w-16 bg-yellow-400 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6">
          <p className="text-sm text-gray-500 font-semibold">Total Revenue</p>
          <p className="text-4xl font-extrabold text-black mt-2">
            ₹{TotalRevenue}
          </p>
          <div className="mt-4 h-1 w-16 bg-yellow-400 rounded-full"></div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6">
          <h2 className="text-xl font-bold text-black mb-4">
            Store <span className="text-yellow-500">Stats</span>
          </h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* LINE CHART */}
        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6">
          <h2 className="text-xl font-bold text-black mb-4">
            Revenue <span className="text-yellow-500">Trend</span>
          </h2>
          <div className="h-64">
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default AdminDashboard;