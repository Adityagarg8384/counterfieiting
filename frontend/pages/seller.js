"use client";
import React, { useState } from "react";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("add");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "add":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Product
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="books">Books</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Product Images
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {images.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {images.length} file(s) selected
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
              >
                Add Product
              </button>
            </form>
          </div>
        );

      case "list":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product List
            </h2>
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-gray-600">Product</th>
                  <th className="px-4 py-2 text-gray-600">Price</th>
                  <th className="px-4 py-2 text-gray-600">Quantity</th>
                  <th className="px-4 py-2 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">Wireless Mouse</td>
                  <td className="px-4 py-2">$25.00</td>
                  <td className="px-4 py-2">12</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    Active
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">Bluetooth Keyboard</td>
                  <td className="px-4 py-2">$40.00</td>
                  <td className="px-4 py-2">8</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    Active
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "orders":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Orders
            </h2>
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-gray-600">Order ID</th>
                  <th className="px-4 py-2 text-gray-600">Customer</th>
                  <th className="px-4 py-2 text-gray-600">Total</th>
                  <th className="px-4 py-2 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">#12345</td>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">$85.00</td>
                  <td className="px-4 py-2 text-orange-500 font-medium">
                    Pending
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">#12346</td>
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">$120.00</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    Completed
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-orange-500 mb-8">
          Seller Dashboard
        </h1>

        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("add")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "add"
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-orange-100"
            }`}
          >
            ➕ Add Product
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "list"
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-orange-100"
            }`}
          >
            📦 Product List
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "orders"
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-orange-100"
            }`}
          >
            🧾 Orders
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}
