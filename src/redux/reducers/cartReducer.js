import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART_ITEM,
} from "../actions/cartActions";

const initialState = {
  items: [], // each item = { product, quantity }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const exists = state.items.find(item => item.product._id === action.payload.product._id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product._id === action.payload.product._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case UPDATE_CART_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.product._id !== action.payload),
      };

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
