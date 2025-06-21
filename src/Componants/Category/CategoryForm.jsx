import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../redux/thunks/categoryThunks";

const CategoryForm = ({ isEditMode = false, existingCategory = {} }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log("TOKEN in CategoryForm:", token); // ✅

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  // Fill form if edit mode
  useEffect(() => {
    if (isEditMode && existingCategory) {
      setFormData({
        name: existingCategory.name || "",
        description: existingCategory.description || "",
        image: null, // Keep image upload separate
      });
    }
  }, [isEditMode, existingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    if (isEditMode) {
      // dispatch(updateCategory(existingCategory._id, payload)); // Uncomment when implemented
    } else {
      dispatch(createCategory(payload)); // token is fetched from state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">
        {isEditMode ? "Edit Category" : "Create Category"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        {isEditMode ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
