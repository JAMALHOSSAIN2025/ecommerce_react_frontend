// src/components/ProductCard.jsx

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-200">
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
