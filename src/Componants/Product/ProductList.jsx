import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../redux/thunks/productThunks";
import { useNavigate } from "react-router-dom";
import { ADD_TO_CART } from "../../redux/actions/cartActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.product);
  console.log("productss",products);
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/products/${id}`);
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { product, quantity: 1 },
    });
  };

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.products?.length > 0 ? (
        products.products?.map((product) => (
          <div key={product._id} className="border rounded p-4 bg-white shadow">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">₹{product.price}</p>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2"
              />
            )}
            <p>{product.description}</p>
            <p className="text-xs text-gray-600 mt-2">
              Category: {product.category?.name || "Uncategorized"}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => handleEdit(product._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleView(product._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
