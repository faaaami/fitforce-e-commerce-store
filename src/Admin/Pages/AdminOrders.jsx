import React, { act, useEffect, useState } from "react";
import api from "../../Services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null); // modal

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // change if you want

  useEffect(() => {
    api
      .get("/orders")
      .then((response) => setOrders(response.data || []))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // ✅ simple sort (no useMemo)
  const sortedOrders = [...orders].sort((a, b) => Number(b.id) - Number(a.id));

  // ✅ pagination calculations
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // ✅ if orders reduce (like delete) keep page valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
    if (totalPages === 0) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const getStatusStyle = (status = "Placed") => {
    const s = String(status).toLowerCase();
    if (s.includes("cancel")) return "bg-red-100 text-red-700 border border-red-200";
    if (s.includes("deliver")) return "bg-green-100 text-green-700 border border-green-200";
    if (s.includes("ship")) return "bg-blue-100 text-blue-700 border border-blue-200";
    return "bg-yellow-100 text-yellow-800 border border-yellow-200";
  };

  // ✅ update status in DB + update UI state
const updateStatus = async (orderId, newStatus) => {
  try {
    console.log(orderId, orders);
    
    // find the full order object from state
    const existing = orders.find((o) => String(o.id) === String(orderId));

    
    if (!existing) {
      alert("Order not found in UI state");
      return;
    }

    const updatedOrder = { ...existing, status: newStatus };

   

    // ✅ use PUT (full replace)
    await api.put(`/orders/${orderId}`, updatedOrder);

    // update UI
    setOrders((prev) =>
      prev.map((o) =>
        String(o.id) === String(orderId) ? { ...o, status: newStatus } : o
      )
    );

    setActiveOrder((prev) =>
      prev && String(prev.id) === String(orderId)
        ? { ...prev, status: newStatus }
        : prev
    );
  } catch (error) {
    console.error("Update status failed:", error);
    console.log("STATUS:", error?.response?.status);
    console.log("DATA:", error?.response?.data);
    console.log("URL:", error?.config?.baseURL + error?.config?.url);
    alert("Failed to update status");
  }
};

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-black">
          Orders <span className="text-yellow-500">({orders.length})</span>
        </h1>
        <p className="text-xs text-gray-500">Click an order to view details</p>
      </div>

      {/* Empty */}
      {sortedOrders.length === 0 ? (
        <div className="bg-white border border-yellow-200 rounded-2xl shadow p-10 text-center">
          <p className="text-gray-600 font-semibold">No orders found.</p>
        </div>
      ) : (
        <div className="bg-white border border-yellow-200 rounded-2xl shadow overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 bg-black text-yellow-400 px-4 py-3 text-sm font-semibold">
            <div className="col-span-2">Preview</div>
            <div className="col-span-4">Order</div>
            <div className="col-span-2">Items</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Rows (✅ paginated) */}
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setActiveOrder(order)}
              className="grid grid-cols-12 items-center px-4 py-3 border-b last:border-b-0
                         hover:bg-yellow-50/40 transition cursor-pointer"
            >
              {/* Image */}
              <div className="col-span-2 flex items-center gap-3">
                <img
                  src={order.items?.[0]?.image || "/default-image.jpg"}
                  alt="Product"
                  className="w-12 h-12 object-contain rounded-lg border border-gray-200 bg-white"
                />
              </div>

              {/* Order */}
              <div className="col-span-4">
                <p className="text-sm font-bold text-black">
                  #{String(order.id).slice(-8)}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {order.userSnapshot?.name || "Unknown user"} • {order.date || ""}
                </p>
              </div>

              {/* Items */}
              <div className="col-span-2">
                <p className="text-sm font-semibold text-black">
                  {order.items?.length || 0}
                </p>
                <p className="text-xs text-gray-500">items</p>
              </div>  

              {/* Total */}
              <div className="col-span-2">
                <p className="text-sm font-extrabold text-black">
                  ₹{order.total || 0}
                </p>
                <p className="text-xs text-gray-500">
                  {order.delivery === 0 ? "Free delivery" : `+₹${order.delivery || 0} ship`}
                </p>
              </div>

              {/* Status dropdown */}
              <div className="col-span-2 flex justify-end">
                <select
                  value={order.status || "Placed"}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className={`text-xs font-semibold px-3 py-2 rounded-full outline-none cursor-pointer ${getStatusStyle(
                    order.status
                  )}`}
                >
                  <option value="Placed">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}

          {/* ✅ Pagination Bar (same theme) */}
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-gray-600">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages || 1}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                Prev
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded text-sm font-semibold transition
                      ${
                        page === currentPage
                          ? "bg-black text-yellow-400"
                          : "border border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal (popup details) */}  
      {activeOrder && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50"
          onClick={() => setActiveOrder(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-hidden"
          >
            {/* Modal header */}
            <div className="bg-black text-yellow-400 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Order Details</p>
                <p className="text-xs text-yellow-200">
                  #{String(activeOrder.id).slice(-8)} • {activeOrder.date}
                </p>
              </div>

              <button
                onClick={() => setActiveOrder(null)}
                className="text-yellow-400 hover:text-white transition text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User */}
              <div className="border border-yellow-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-semibold mb-2">Customer</p>
                <p className="font-bold text-black">{activeOrder.userSnapshot?.name || "-"}</p>
                <p className="text-sm text-gray-600">{activeOrder.userSnapshot?.email || "-"}</p>
                <p className="text-sm text-gray-600">{activeOrder.userSnapshot?.phone || "-"}</p>
                <p className="text-xs text-gray-500 mt-2">
                  User ID: <span className="font-semibold">{activeOrder.userId || "-"}</span>
                </p>
              </div>

              {/* Address */}
              <div className="border border-yellow-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-semibold mb-2">Shipping</p>
                <p className="text-sm font-semibold text-black">{activeOrder.address?.name || "-"}</p>
                <p className="text-sm text-gray-600">{activeOrder.address?.phone || "-"}</p>
                <p className="text-sm text-gray-600">{activeOrder.address?.address || "-"}</p>
                <p className="text-sm text-gray-600">
                  {activeOrder.address?.city || "-"} • {activeOrder.address?.pincode || "-"}
                </p>
              </div>

              {/* Payment */}
              <div className="border border-yellow-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-semibold mb-2">Payment & Totals</p>
                <p className="text-sm text-gray-700">
                  Method: <span className="font-semibold">{activeOrder.paymentMethod || "-"}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Subtotal: <span className="font-semibold">₹{activeOrder.subtotal || 0}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Delivery: <span className="font-semibold">₹{activeOrder.delivery || 0}</span>
                </p>
                <p className="text-lg font-extrabold text-black mt-2">
                  Total: ₹{activeOrder.total || 0}
                </p>

                <div className="mt-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Status</p>
                  <select
                    value={activeOrder.status || "Placed"}
                    onChange={(e) => updateStatus(activeOrder.id, e.target.value)}
                    className={`w-full text-sm font-semibold px-3 py-2 rounded-lg outline-none ${getStatusStyle(
                      activeOrder.status
                    )}`}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="px-6 pb-6">
              <h3 className="text-black font-extrabold mb-3">
                Items <span className="text-yellow-500">({activeOrder.items?.length || 0})</span>
              </h3>

              <div className="border border-yellow-200 rounded-xl overflow-hidden">
                {activeOrder.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-contain rounded-lg border border-gray-200"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-black">{item.name}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: <span className="font-semibold">{item.quantity || 1}</span>
                      </p>
                    </div>

                    <p className="font-extrabold text-black">₹{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setActiveOrder(null)}
                  className="px-5 py-2 rounded-lg border border-black text-black font-semibold hover:bg-black hover:text-yellow-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;