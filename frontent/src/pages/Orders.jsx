import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [trackVisibleIndex, setTrackVisibleIndex] = useState(null);

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

  const statusSteps = ['OrderPlaced', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];

  return (
    <div className="border-t pt-16 px-4">
      <div className="text-2xl text-center">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No orders found.</p>
      ) : (
        <div className="space-y-4 mt-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start justify-between gap-4 w-full text-sm">
                {/* Left: Image + Details */}
                <div className="flex gap-4">
                  <img
                    className="w-16 sm:w-20 object-cover rounded"
                    src={item.image?.[0] || '/default.png'}
                    alt={item.name || 'Product'}
                    onError={(e) => (e.target.src = '/default.png')}
                  />
                  <div>
                    <p className="sm:text-base font-medium mb-1">{item.name || 'Unnamed Product'}</p>

                    {/* Price, Quantity, Size */}
                    <div className="text-base text-gray-700 space-y-1">
                      <p>Price: {currency}{item.price?.toFixed(2) || '0.00'}</p>
                      <p>Quantity: {item.quantity || 1}</p>
                      <p>Size: {item.size || 'N/A'}</p>
                    </div>

                    {/* Date and Payment */}
                    <div className="mt-2 space-y-1 text-sm">
                      <p>Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span></p>
                      <p>Payment: <span className="text-gray-400">{item.paymentMethod || 'N/A'}</span></p>
                    </div>
                  </div>
                </div>

                {/* Right: Track Order Button */}
                <div className="hidden md:flex items-start">
                  <button
                    onClick={() => setTrackVisibleIndex(trackVisibleIndex === index ? null : index)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {trackVisibleIndex === index ? 'Hide Tracking' : 'Track Order'}
                  </button>
                </div>
              </div>

              {/* Mobile: Track Order Button */}
              <div className="flex md:hidden justify-end pr-2">
                <button
                  onClick={() => setTrackVisibleIndex(trackVisibleIndex === index ? null : index)}
                  className="text-blue-600 hover:underline text-sm "
                >
                  {trackVisibleIndex === index ? 'Hide Tracking' : 'Track Order'}
                </button>
              </div>

              {/* Status Tracker */}
              {trackVisibleIndex === index && (
                <div className="w-full md:w-3/4 mx-auto">
                  <p className="text-sm font-medium text-gray-700 mb-2">Order Status:</p>
                  <div className="flex items-center justify-between gap-2 relative">
                    {statusSteps.map((step, stepIndex) => {
                      const currentIndex = statusSteps.indexOf(item.status);
                      const isCompleted = stepIndex <= currentIndex;

                      return (
                        <div key={step} className="flex-1 relative z-10">
                          <div className="flex flex-col items-center text-center">
                            {/* Dot */}
                            <div className={`w-4 h-4 rounded-full border-2 ${isCompleted ? 'bg-green-500 border-green-600' : 'bg-gray-200 border-gray-400'}`}></div>
                            {/* Label */}
                            <span className="text-[10px] mt-1">{step}</span>
                          </div>
                          {/* Connector Line */}
                          {stepIndex < statusSteps.length - 1 && (
                            <div
                              className={`absolute top-2 left-1/2 w-full h-0.5 transform -translate-x-0 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
