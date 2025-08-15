'use client'

import React, { useState } from 'react'

export default function Page() {
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      console.log("New category added:", newCategory) 
      setNewCategory("")
    }
  }

  return (
    <div>
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
      </div>
    </div>
  )
}
