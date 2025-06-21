import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  console.log("tokeeen",token);
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`${API_URL}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("💡 Product detail response:", res.data);
      setProduct(res.data);
      
    };

    fetchProduct();
  }, [id, token]);

  if (!product) return <p className="text-center mt-4">Loading product...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-500 mb-2">₹{product.price}</p>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover mb-4"
        />
      )}
      <p className="mb-2">{product.description}</p>
      <p className="text-sm text-gray-600">Category: {product.category?.name}</p>
    </div>
  );
};

export default ProductDetailPage;
