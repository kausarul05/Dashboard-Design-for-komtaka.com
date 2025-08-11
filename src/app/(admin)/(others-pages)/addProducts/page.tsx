"use client";

import { useState, DragEvent, ChangeEvent } from "react";
// import { CloudUpload } from "lucide-react";

export default function AddProductPage() {
  const [images, setImages] = useState<File[]>([]);

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(file =>
      ["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(file.type) &&
      file.size <= 10 * 1024 * 1024
    );
    setImages(prev => [...prev, ...validFiles]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      {/* Upload Box */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-8 text-center cursor-pointer hover:border-blue-400 transition"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {/* <CloudUpload className="mx-auto h-10 w-10 text-gray-400" /> */}
        <p className="mt-2 font-medium">Upload Photos</p>
        <p className="text-sm text-gray-500">JPG, JPEG, PNG, PDF, GIF<br />max: 10 MB</p>
        <input
          id="fileInput"
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Preview Grid */}
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
  );
}
