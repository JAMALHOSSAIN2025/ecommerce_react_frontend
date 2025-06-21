// src/pages/MyOrders.jsx

import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const MyOrders = () => {
  const { authTokens } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orders/my-orders/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`
          }
        })
        setOrders(response.data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [authTokens])

  if (loading) return <div className="p-4">Loading your orders...</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-2">#{order.id}</td>
                <td className="p-2">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-2">${order.total_price}</td>
                <td className="p-2">
                  {order.paid ? '✅ Paid' : '❌ Not Paid'} /{' '}
                  {order.is_delivered ? '🚚 Delivered' : '⏳ Pending'}
                </td>
                <td className="p-2">
                  <Link
                    to={`/order-confirmation/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MyOrders
