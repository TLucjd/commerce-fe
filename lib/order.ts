import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const placeOrder = async (orderData: {
  products: { productId: string; quantity: number; price: number }[]
}) => {
  const token = Cookies.get('access_token')

  const res = await axios.post(`${BASE_URL}/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const getMyOrders = async () => {
  const token = Cookies.get('access_token')
  const res = await axios.get(`${BASE_URL}/orders/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const getOrderById = async (id: string) => {
  const token = Cookies.get('access_token')
  const res = await axios.get(`${BASE_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}