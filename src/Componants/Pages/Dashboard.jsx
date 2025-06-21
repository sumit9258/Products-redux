import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../redux/thunks/categoryThunks";
import { fetchProducts } from "../../redux/thunks/productThunks";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);

  console.log("dashhh",categories.categories);
  // console.log("dash1",products);
  

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Categories</p>
          <p className="text-2xl font-bold">{categories.categories?.length || 0}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Products</p>
          <p className="text-2xl font-bold">{products?.products?.length || products?.length || 0}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">User</p>
          <p className="text-xl">{user?.username}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/categories"
          className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
        >
          Manage Categories
        </Link>
        <Link
          to="/products"
          className="block bg-green-600 text-white text-center py-2 rounded hover:bg-green-700"
        >
          Manage Products
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
