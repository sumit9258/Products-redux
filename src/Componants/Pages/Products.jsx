import React, { useState } from "react";
import ProductList from "../Product/ProductList";
import ProductForm from "../Product/ProductForm";

const Products = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {/* Toggle Button */}
      <div className="mb-4">
        <button
          onClick={handleToggle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "Create Product"}
        </button>
      </div>

      {/* Show form only when toggled */}
      {showForm && <ProductForm />}

      <ProductList />
    </div>
  );
};

export default Products;
