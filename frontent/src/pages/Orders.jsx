import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token) {
      console.warn("No token available.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap(order =>
          order.items.map(item => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );
        setOrderData(allOrdersItem.reverse());
      } else {
        console.warn("No orders found.");
      }
    } catch (error) {
      console.error('Failed to load orders:', error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'OrderPlaced': return 'bg-yellow-500';
      case 'Packing': return 'bg-blue-500';
      case 'Shipped': return 'bg-indigo-500';
      case 'Out for delivery': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No orders found.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover rounded"
                  src={item.image?.[0] || '/default.png'}
                  alt={item.name || 'Product'}
                  onError={(e) => (e.target.src = '/default.png')}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name || 'Unnamed Product'}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>{currency}{item.price?.toFixed(2) || '0.00'}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Size: {item.size || 'N/A'}</p>
                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod || 'N/A'}</span></p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                  <p className="text-sm md:text-base font-semibold">{item.status || 'Unknown'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
