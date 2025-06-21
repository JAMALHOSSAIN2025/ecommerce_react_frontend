import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  let cartItems = [];

  try {
    const cartContext = useContext(CartContext);
    if (cartContext && Array.isArray(cartContext.cartItems)) {
      cartItems = cartContext.cartItems;
    }
  } catch (error) {
    console.error("CartContext not available:", error);
  }

  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Error parsing user token:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/">My Ecommerce</Link>
        </div>

        <ul className="flex space-x-8 items-center list-none m-0 p-0">
          <li>
            <Link to="/" className="hover:underline px-2 py-1 block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:underline px-2 py-1 block">
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline px-2 py-1 block">
              Cart ({cartItems?.length || 0})
            </Link>
          </li>

          {user && (
            <li>
              <Link to="/my-orders" className="hover:underline px-2 py-1 block">
                My Orders
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className="text-sm px-2 py-1">
                Welcome, <strong>{user?.username || 'User'}</strong>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:underline px-2 py-1 block">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
