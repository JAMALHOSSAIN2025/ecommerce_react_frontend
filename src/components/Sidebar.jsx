// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-100 p-4 w-64 h-screen">
      <h2 className="text-xl font-bold">Sidebar</h2>
      <ul className="mt-4 space-y-2">
        <li>Dashboard</li>
        <li>Orders</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
