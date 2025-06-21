import React, { useState } from "react";
import CategoryForm from "../Category/CategoryForm";
import CategoryList from "../Category/CategoryList";

const Categories = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Categories</h2>

      <div className="mb-4">
        <button
          onClick={handleToggle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "Create Category"}
        </button>
      </div>

      {showForm && <CategoryForm />}
      <CategoryList />
    </div>
  );
};

export default Categories;
