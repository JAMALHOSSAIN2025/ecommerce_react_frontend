// src/pages/CompleteProfile.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function CompleteProfile() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post('/accounts/api/complete-profile/', 
        { phone },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      setError('Profile update failed');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CompleteProfile;
