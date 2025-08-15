"use client";

import { useState, DragEvent, ChangeEvent } from "react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offterprice: "",
    stock: "",
    sku: "",
    brand: "",
    status: "active",
  });

  const [categories, setCategories] = useState<string[]>([
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
  ]);

  const [images, setImages] = useState<File[]>([]);
   const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Handle text, textarea, and select changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "category" && value === "__add_new__") {
      const newCategory = prompt("Enter new category name:");
      if (newCategory && newCategory.trim() !== "") {
        const updatedCategories = [...categories, newCategory.trim()];
        setCategories(updatedCategories);
        setFormData((prev) => ({ ...prev, category: newCategory.trim() }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(
      (file) =>
        ["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(
          file.type
        ) && file.size <= 10 * 1024 * 1024
    );
    setImages((prev) => [...prev, ...validFiles]);
  };

   // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setFormData((prev) => ({ ...prev, category: newCategory.trim() }));
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    console.log("Images:", images);
    // API call to backend here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Upload Box */}
        <div>
          <label className="block mb-2 font-medium">Product Images</label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-8 text-center cursor-pointer hover:border-blue-400 transition"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <p className="mt-2 font-medium">Upload Photos</p>
            <p className="text-sm text-gray-500">
              JPG, JPEG, PNG, PDF, GIF | Max: 10 MB
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Preview */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-full h-24 flex items-center justify-center bg-gray-200 rounded-lg border text-sm text-gray-500">
                      PDF File
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <div className="flex gap-2">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="flex-1 border rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowAddCategory(true)}
              className="border border-gray-300 px-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              ➕ Add Category
            </button>
          </div>

          {showAddCategory && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddCategory(false);
                  setNewCategory("");
                }}
                className="border border-gray-300 px-3 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Price, Offer, Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Offer Price ($)</label>
            <input
              type="number"
              name="offterprice"
              value={formData.offterprice}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter offer price"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter stock"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter SKU"
            />
          </div>
        </div>

        {/* SKU & Brand */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter brand name"
            />
          </div>

          <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
