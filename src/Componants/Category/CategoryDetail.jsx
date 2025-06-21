import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../redux/thunks/categoryThunks";
import { useNavigate } from "react-router-dom";

const CategoryDetail = ({ category }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(category._id, token));
    }
  };

  const handleEdit = () => {
    navigate(`/categories/${category._id}`); // Go to edit page
  };

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
      {category.image && (
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-40 object-cover mb-2"
        />
      )}
      <p>{category.description}</p>

      <div className="flex gap-2 mt-4">
        <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-1 rounded">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryDetail;
