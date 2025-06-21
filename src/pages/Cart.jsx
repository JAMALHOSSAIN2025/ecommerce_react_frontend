// src/pages/Cart.jsx

import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    console.log("🧺 Cart items updated:", cartItems); // ✅ Debug log
  }, [cartItems]);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id || index}
                className="flex justify-between items-center border p-4 rounded shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <button
                  onClick={() => {
                    console.log("Removing item with id:", item.id); // ✅ Debug log
                    removeFromCart(item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={() => alert("Checkout is not implemented yet.")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
