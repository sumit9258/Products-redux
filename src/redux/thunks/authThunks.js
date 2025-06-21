// src/redux/thunks/authThunks.js

import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../actions/authActions";
import { API_URL } from "../../constants";

// Thunk: Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/register`, userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data, // e.g., { message: "User created" }
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";

    dispatch({
      type: REGISTER_FAIL,
      payload: errorMessage,
    });

    throw new Error(errorMessage);
  }
};

// Thunk: Login User
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/login`, credentials);

    const { token, user } = response.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });

    return { token, user };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";

    dispatch({
      type: LOGIN_FAIL,
      payload: errorMessage,
    });

    throw new Error(errorMessage);
  }
};

// Thunk: Fetch User Profile
export const fetchUserProfile = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  try {
    const response = await axios.get(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: response.data, // e.g., { username, email, ... }
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch profile";

    dispatch({
      type: USER_PROFILE_FAIL,
      payload: errorMessage,
    });
  }
};














