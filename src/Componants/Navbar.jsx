import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_CART } from "../redux/actions/cartActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: CLEAR_CART });
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-3 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          🛍️ MyShop
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center flex-wrap mt-2 md:mt-0">
          <Link to="/products" className="hover:underline">
            Products
          </Link>

          <Link to="/categories" className="hover:underline">
            Categories
          </Link>

          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>

          <Link to="/cart" className="hover:underline relative">
            Cart
            {items.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          <Link to="/profile" className="hover:underline">
            Profile
          </Link>

          {/* Auth Links */}
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-200">Hi, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
