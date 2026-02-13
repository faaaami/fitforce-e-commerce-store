import React, { useState, useEffect } from "react";
import api from "../../Services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ edit states
  const [editingId, setEditingId] = useState(null);
  const [editQty, setEditQty] = useState("");

  // ✅ add product modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    image: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ pagination calculations
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // ✅ small helper for stock UI
  const stockBadge = (qty) => {
    const q = Number(qty) || 0;
    if (q === 0) return "bg-red-100 text-red-700 border border-red-200";
    if (q <= 5) return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    return "bg-green-100 text-green-700 border border-green-200";
  };

  const stockText = (qty) => {
    const q = Number(qty) || 0;
    if (q === 0) return "Out";
    if (q <= 5) return "Low";
    return "In";
  };

  // ✅ Start editing
  const handleEditStart = (product) => {
    setEditingId(product.id);
    setEditQty(String(product.quantity ?? 0));
  };

  // ✅ Cancel editing
  const handleEditCancel = () => {
    setEditingId(null);
    setEditQty("");
  };

  // ✅ Save quantity
  const handleSaveQty = async (productId) => {
    const qtyNumber = Number(editQty);

    if (Number.isNaN(qtyNumber) || qtyNumber < 0) {
      alert("Quantity must be a number 0 or more");
      return;
    }

    try {
      await api.patch(`/products/${productId}`, { quantity: qtyNumber });

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, quantity: qtyNumber } : p))
      );

      setEditingId(null);
      setEditQty("");
    } catch (err) {
      console.log("Error updating quantity:", err);
      alert("Failed to update quantity");
    }
  };

  // ✅ Delete product
  const handleDelete = async (productId) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await api.delete(`/products/${productId}`);

      setProducts((prev) => prev.filter((p) => p.id !== productId));

      setTimeout(() => {
        const newTotalPages = Math.ceil((products.length - 1) / itemsPerPage);
        if (currentPage > newTotalPages) {
          setCurrentPage(Math.max(newTotalPages, 1));
        }
      }, 0);
    } catch (err) {
      console.log("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  // ✅ ADD PRODUCT: open modal + reset form
  const openAddModal = () => {
    setNewProduct({
      id: String(Date.now()), // ✅ id string
      name: "",
      price: "",
      category: "",
      image: "",
      quantity: "",
      description: "",
    });
    setIsAddOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save new product to db.json
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name.trim()) return alert("Name is required");
    if (!newProduct.category.trim()) return alert("Category is required");
    if (!newProduct.image.trim()) return alert("Image is required");
    if (!newProduct.description.trim()) return alert("Description is required");

    const priceNum = Number(newProduct.price);
    const qtyNum = Number(newProduct.quantity);

    if (Number.isNaN(priceNum) || priceNum <= 0) return alert("Price must be a valid number");
    if (Number.isNaN(qtyNum) || qtyNum < 0) return alert("Quantity must be 0 or more");

    const payload = {
      ...newProduct,
      id: String(newProduct.id), // ✅ ensure string
      price: priceNum,
      quantity: qtyNum,
    };

    try {
      const res = await api.post("/products", payload);

      // ✅ update UI (add on top)
      setProducts((prev) => [res.data, ...prev]);

      // ✅ go to first page to see it
      setCurrentPage(1);

      closeAddModal();
    } catch (err) {
      console.log("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-black">
          Admin <span className="text-yellow-500">Products</span>
        </h1>

        <p className="text-sm text-gray-500">
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-lg bg-black text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition"
          >
            Add a Product
          </button>
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow border border-yellow-200 overflow-hidden">
        {/* Head */}
        <div className="grid grid-cols-6 bg-black text-yellow-400 font-semibold text-sm px-4 py-3">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p className="text-center">Qty</p>
          <p>Price</p>
          <p className="text-right">Actions</p>
        </div>

        {/* Rows */}
        {currentProducts.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-6 items-center text-sm px-4 py-3 border-b hover:bg-gray-50 transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-12 h-12 object-contain rounded"
            />

            <p className="font-semibold text-black line-clamp-1">{p.name}</p>

            <p className="text-gray-500 capitalize">{p.category}</p>

            <div className="flex items-center justify-center gap-2">
              {editingId === p.id ? (
                <input
                  type="number"
                  min="0"
                  value={editQty}
                  onChange={(e) => setEditQty(e.target.value)}
                  className="w-20 px-2 py-1 border rounded-md text-center focus:outline-none focus:border-yellow-400"
                />
              ) : (
                <>
                  <span className="font-bold text-black">{p.quantity ?? 0}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${stockBadge(
                      p.quantity
                    )}`}
                  >
                    {stockText(p.quantity)}
                  </span>
                </>
              )}
            </div>

            <p className="font-bold text-black">₹{p.price}</p>

            <div className="flex gap-2 justify-end">
              {editingId === p.id ? (
                <>
                  <button
                    onClick={() => handleSaveQty(p.id)}
                    className="px-3 py-1 text-xs bg-black text-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditStart(p)}
                    className="px-3 py-1 text-xs bg-black text-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 text-xs border border-red-400 text-red-600 rounded hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="p-6 text-center text-gray-500">No products found.</div>
        )}

        {/* Pagination */}
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

      {/* ✅ ADD PRODUCT MODAL */}
      {isAddOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50"
          onClick={closeAddModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-hidden"
          >
            <div className="bg-black text-yellow-400 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Add Product</p>
                <p className="text-xs text-yellow-200">Fill product details and save</p>
              </div>

              <button
                onClick={closeAddModal}
                className="text-yellow-400 hover:text-white transition text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input
                  name="name"
                  value={newProduct.name}
                  onChange={handleNewChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <input
                  name="category"
                  value={newProduct.category}
                  onChange={handleNewChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="whey / creatine / etc"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Price</label>
                <input
                  name="price"
                  value={newProduct.price}
                  onChange={handleNewChange}
                  type="number"
                  min="1"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="₹"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                <input
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleNewChange}
                  type="number"
                  min="0"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Image Path</label>
                <input
                  name="image"
                  value={newProduct.image}
                  onChange={handleNewChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="/Allproducts/pro1.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleNewChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-400"
                  rows={4}
                  placeholder="Product description..."
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-5 py-2 rounded-lg border border-black text-black font-semibold hover:bg-black hover:text-yellow-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-black text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;