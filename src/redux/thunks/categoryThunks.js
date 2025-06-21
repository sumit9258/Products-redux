import axios from "axios";
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_REQUEST,
} from "../actions/categoryActions";
import { API_URL } from "../../constants";

// ✅ Thunk: Fetch all categories
export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });

  try {
    const response = await axios.get(`${API_URL}/api/category`);
    console.log("✅ CATEGORY API RESPONSE:", response.data); // 👈 ADD THIS

    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: response.data, // should be an array of categories
    });
  } catch (error) {
    dispatch({
      type: FETCH_CATEGORIES_FAIL,
      payload: error.response?.data?.message || "Failed to fetch categories",
    });
  }
};

// ✅ Thunk: Create a new category (uses token from Redux state)
export const createCategory = (formData) => async (dispatch, getState) => {
  const { token } = getState().auth;
  
  try {
      console.log("Token in thunk:", token); // ✅ log this
    await axios.post(`${API_URL}/api/category`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(fetchCategories()); // Refresh category list
  } catch (error) {
    console.error("Create category error:", error);
    dispatch({
      type: FETCH_CATEGORIES_FAIL,
      payload: error.response?.data?.message || "Failed to create category",
    });
  }
};

// ✅ Thunk: Delete a category (uses token from Redux state)
export const deleteCategory = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  try {
    await axios.delete(`${API_URL}/api/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchCategories());
  } catch (error) {
    console.error("Delete failed", error);
  }
};

// ✅ Thunk: Update a category (uses token from Redux state)
export const updateCategory = (id, formData) => async (dispatch, getState) => {
  const { token } = getState().auth;

  try {
    await axios.put(`${API_URL}/api/category/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(fetchCategories());
  } catch (error) {
    console.error("Update failed", error);
  }
};
