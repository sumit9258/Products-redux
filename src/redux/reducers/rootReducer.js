import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
// Add other reducers later (categoryReducer, productReducer, etc.)

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer
});

export default rootReducer;
