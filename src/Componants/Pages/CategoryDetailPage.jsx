import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../constants";

const CategoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cat = res.data;
        setFormData({
          name: cat.name,
          description: cat.description,
          image: null,
        });
      } catch (error) {
        console.error("❌ Failed to load category", error);
      }
    };

    if (id) fetchCategory();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      await axios.put(`${API_URL}/api/category/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Category updated!");
      navigate("/categories");
    } catch (error) {
      console.error("❌ Update failed", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Category Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default CategoryDetailPage;
