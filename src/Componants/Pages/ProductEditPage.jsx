import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "../Product/ProductForm";
import { useSelector } from "react-redux";
import { API_URL } from "../../constants";

const ProductEditPage = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`${API_URL}/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data);
    };

    fetchProduct();
  }, [id, token]);

  if (!product) return <p className="text-center mt-4">Loading product...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <ProductForm isEditMode={true} existingProduct={product} />
    </div>
  );
};

export default ProductEditPage;
