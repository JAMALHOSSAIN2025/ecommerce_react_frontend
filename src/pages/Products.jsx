// src/pages/Products.jsx

import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/api/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            {product.image && (
              <img
                src={
                  product.image.startsWith('/media/')
                    ? `http://localhost:8000${product.image}`
                    : `http://localhost:8000/media/${product.image}`
                }
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="font-bold mb-4">${product.price}</p>
            <button
              onClick={() => {
                const item = {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                };
                console.log("🛒 Adding to cart:", JSON.stringify(item, null, 2));
                addToCart(item);
                }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
