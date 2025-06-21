// src/pages/Checkout.jsx

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)

  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    postal_code: '',
    country: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  const [orderItems, setOrderItems] = useState(() => {
    const items = localStorage.getItem('cartItems')
    return items ? JSON.parse(items) : []
  })

  const getTotalPrice = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8000/api/orders/create/',
        {
          shipping_address: shipping,
          payment_method: paymentMethod,
          order_items: orderItems.map(item => ({
            product: item.id,
            quantity: item.quantity
          })),
          total_price: getTotalPrice()
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          }
        }
      )

      localStorage.removeItem('cartItems')
      navigate(`/order-confirmation/${response.data.id}`)
    } catch (err) {
      console.error(err)
      alert('Checkout failed. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            value={shipping.address}
            onChange={e => setShipping({ ...shipping, address: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">City</label>
          <input
            type="text"
            value={shipping.city}
            onChange={e => setShipping({ ...shipping, city: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Postal Code</label>
          <input
            type="text"
            value={shipping.postal_code}
            onChange={e => setShipping({ ...shipping, postal_code: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <input
            type="text"
            value={shipping.country}
            onChange={e => setShipping({ ...shipping, country: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="bKash">bKash</option>
            <option value="Card">Card</option>
          </select>
        </div>

        <div className="font-semibold">
          Total: <span className="text-green-600">${getTotalPrice()}</span>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}

export default Checkout
