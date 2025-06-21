// src/api/auth.js

// লগইন ফাংশন - ইমেইল ও পাসওয়ার্ড দিয়ে টোকেন আনবে
export async function loginUser(email, password) {
  try {
    const response = await fetch('http://127.0.0.1:8000/accounts/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    // টোকেনগুলো লোকালস্টোরেজে সংরক্ষণ করো
    storeTokens(data);

    return data;

  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

// টোকেনগুলো লোকালস্টোরেজে রাখার ফাংশন
export function storeTokens({ access, refresh }) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

// কারেন্ট ইউজারের ডাটা লোকালস্টোরেজ থেকে নেয়ার ফাংশন
export function getCurrentUser() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) return null;

  // Access token থেকে ইউজারের ইনফো ডিকোড করা যায়, কিন্তু সেটা একটু বেশি জটিল
  // এখানে আমরা শুধু টোকেন আছে কিনা সেটা চেক করবো
  return { token: accessToken };
}

// লগআউট ফাংশন, টোকেনগুলো মুছে দিবে
export function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
