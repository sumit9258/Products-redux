import axios from "axios";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from "../actions/productActions";
import { API_URL } from "../../constants";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const response = await axios.get(`${API_URL}/api/product`);

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch products",
    });
  }
};


export const createProduct = (formData) => async (dispatch, getState) => {
  const { token } = getState().auth;

  try {
    await axios.post(`${API_URL}/api/product`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(fetchProducts()); // Refresh product list
  } catch (error) {
    console.error("Product creation failed:", error);
  }
};



export const deleteProduct = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  try {
    await axios.delete(`${API_URL}/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchProducts());
  } catch (error) {
    console.error("❌ Product delete failed:", error);
  }
};


export const updateProduct = (id, formData) => async (dispatch, getState) => {
  const { token } = getState().auth;

  try {
    await axios.put(`${API_URL}/api/product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(fetchProducts());
  } catch (error) {
    console.error("Update failed", error);
  }
};
