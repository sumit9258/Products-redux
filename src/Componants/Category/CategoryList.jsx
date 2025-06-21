import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../redux/thunks/categoryThunks";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/categories/${id}`);
    }
  };

  const handleDelete = (id) => {
    if (id && window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  if (loading) return <p className="text-center mt-4">Loading categories...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {
        categories.categories?.map((cat) => (
          <div key={cat._id} className="border rounded p-4 shadow bg-white">
            <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover mb-2"
              />
            )}
            <p>{cat.description}</p>

            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => handleEdit(cat._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CategoryList;
