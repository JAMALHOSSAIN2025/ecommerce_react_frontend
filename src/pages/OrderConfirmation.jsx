// src/pages/OrderConfirmation.jsx

import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const { authTokens } = useContext(AuthContext)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${orderId}/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`
          }
        })
        setOrder(response.data)
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, authTokens])

  if (loading) return <div className="p-4">Loading order details...</div>

  if (!order) return <div className="p-4 text-red-600">Order not found</div>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-700">🎉 Order Placed Successfully!</h2>
      <p className="mb-2">Order ID: #{order.id}</p>
      <p className="mb-4">Placed on: {new Date(order.created_at).toLocaleString()}</p>

      <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
      <div className="mb-4">
        <p>{order.shipping_address.address}</p>
        <p>{order.shipping_address.city}, {order.shipping_address.postal_code}</p>
        <p>{order.shipping_address.country}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Items</h3>
      <ul className="space-y-2 mb-4">
        {order.order_items.map(item => (
          <li key={item.id} className="border p-3 rounded">
            <p><strong>{item.product.name}</strong></p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>

      <div className="text-lg font-bold">
        Total Paid: <span className="text-green-700">${order.total_price}</span>
      </div>
    </div>
  )
}

export default OrderConfirmation
