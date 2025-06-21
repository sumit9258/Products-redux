import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../redux/thunks/productThunks";
import { fetchCategories } from "../../redux/thunks/categoryThunks";

const ProductForm = ({ isEditMode = false, existingProduct = {}, productId = null }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  // Pre-fill form in edit mode
  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        price: existingProduct.price || "",
        category: existingProduct.category?._id || "",
        image: null,
      });
    }
  }, [isEditMode, existingProduct]);

  // Load categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    if (isEditMode && productId) {
      dispatch(updateProduct(productId, payload));
    } else {
      dispatch(createProduct(payload));
      setFormData({ name: "", description: "", price: "", category: "", image: null });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow mb-6"
    >
      <h2 className="text-xl font-bold text-center mb-2">
        {isEditMode ? "Edit Product" : "Create Product"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        min="0"
        className="w-full border p-2 rounded"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">-- Select Category --</option>
        {Array.isArray(categories?.categories) &&
          categories.categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {isEditMode ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
