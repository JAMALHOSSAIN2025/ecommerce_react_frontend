// src/api/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ecommerce-django-5g7x.onrender.com',  // 🟢 এখানেই মূল Backend URL
  withCredentials: true, // যদি cookies লাগে
});

export default instance;
