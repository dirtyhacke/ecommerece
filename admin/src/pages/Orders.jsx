import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      console.warn("Token not available, skipping fetchAllOrders");
      return;
    }

    try {
      console.log("Fetching orders with token:", token);
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      console.log("Orders API response:", response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        console.log("Orders set:", response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    console.log(`Updating status for Order ID ${orderId} to "${newStatus}"`);

    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: newStatus },
        { headers: { token } }
      );
      console.log("Status update response:", response.data);
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    console.log("useEffect triggered with token:", token);
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
            <img src={assets.parcel_icon} alt="" className='w-12' />
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className='py-0.5' key={idx}>
                    {item.name} x {item.quantity}
                    <span> {item.size}</span>
                    {idx !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <div>
                <p className='mt-3 mb-2 font-medium'>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.contry}, {order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
              <p className='font-bold'>{order.address.firstName + " " + order.address.lastName}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethode}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
            <select className='p-2 font-semibold' value={order.status} onChange={(event) => statusHandler(event, order._id)}>
              <option value="OrderPlaced">OrderPlaced</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
