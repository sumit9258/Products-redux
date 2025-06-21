import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("💡 Product API response:", res.data);
        // Use correct path based on backend response
        const productData = res.data.product || res.data;
        setProduct(productData);
      } catch (error) {
        console.error("❌ Failed to load product:", error.response?.data || error.message);
      }
    };

    fetchProduct();
  }, [id, token]);

  if (!product) return <p className="text-center mt-4">Loading product...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-500 mb-2">₹{product.price ?? "Not available"}</p>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover mb-4"
        />
      )}

      <p className="mb-2">{product.description || "No description provided."}</p>

      <p className="text-sm text-gray-600">
        Category: {product.category?.name || "Uncategorized"}
      </p>
    </div>
  );
};

export default ProductDetailPage;
