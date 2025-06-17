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
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Status update response:", response.data);
      if (response.data.success) {
        toast.success("Order status updated successfully");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.message);
    }
  }

  const handlePrint = (order) => {
    const orderWindow = window.open('', 'PRINT', 'height=600,width=800');

    orderWindow.document.write(`
      <html>
        <head>
          <title>Order Bill</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { margin-top: 0; }
            p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Order Bill</h2>
          <p><strong>Name:</strong> ${order.address.firstName} ${order.address.lastName}</p>
          <p><strong>Address:</strong> ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.contry} - ${order.address.zipcode}</p>
          <p><strong>Phone:</strong> ${order.address.phone}</p>
          <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.size}</td>
                  <td>${item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <h3>Total: ${currency} ${order.amount}</h3>
        <!--<p><strong>Status:</strong> ${order.status}</p>-->
        </body>
      </html>
    `);

    orderWindow.document.close();
    orderWindow.focus();
    orderWindow.print();
    orderWindow.close();
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
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >
            <img src={assets.parcel_icon || "fallback.png"} alt="Parcel" className='w-12' />

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
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>

            <div className='flex flex-col gap-2'>
              <select
                className='p-2 font-semibold border border-gray-300 rounded'
                value={order.status}
                onChange={(event) => statusHandler(event, order._id)}
              >
                <option value="OrderPlaced">OrderPlaced</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              <button
                className='px-3 py-2 border text-black bg-stone-100 rounded hover:bg-stone-200 text-sm font-semibold'
                onClick={() => handlePrint(order)}
              >
                Print Bill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders




{/* original  code  without  the bill option ---------
  
  
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
      const response = await axios.post(
      backendUrl + '/api/order/list',
      {},
      { headers: { Authorization: Bearer ${token} } } // ✅ Fix here
    );

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
    console.log(Updating status for Order ID ${orderId} to "${newStatus}");

    try {
      const response = await axios.post(
    backendUrl + '/api/order/status',
    { orderId, status: newStatus },
    { headers: { Authorization: Bearer ${token} } } // ✅ Fix here too
    );

      console.log("Status update response:", response.data);
      if (response.data.success) {
        toast.success("Order status updated successfully");
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
            <img src={assets.parcel_icon || "fallback.png"} alt="Parcel" className='w-12' />

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
              <p className='mt-3'>Method: {order.paymentMethod}</p>
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
  
  
  */}