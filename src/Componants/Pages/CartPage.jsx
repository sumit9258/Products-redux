import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from "../../redux/actions/cartActions";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, qty) => {
    if (qty >= 1) {
      dispatch({ type: UPDATE_CART_ITEM, payload: { id, quantity: qty } });
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const handleClear = () => {
    dispatch({ type: CLEAR_CART });
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Your Shopping Cart</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
          <a
            href="/products"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Shop Now
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <ul className="space-y-6">
              {items.map(({ product, quantity }) => (
                <li
                  key={product._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      {/* Product Image Placeholder */}
                      <img
                        src={product.image || "https://via.placeholder.com/80"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(product._id, quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(product._id, Number(e.target.value))}
                          className="w-16 text-center border-none focus:ring-0"
                        />
                        <button
                          onClick={() => handleQuantityChange(product._id, quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="w-full mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Clear Cart
            </button>
            <button
              className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;