// src/components/Footer.jsx

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 text-center">
      &copy; {new Date().getFullYear()} My Ecommerce. All rights reserved.
    </footer>
  );
}
