// src/redux/reducers/authReducer.js

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../actions/authActions";

const initialState = {
  user: null,
  token: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        // You can also set isAuthenticated = false here
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case USER_PROFILE_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
