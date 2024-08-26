import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchOrders = async () => {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  console.log('API Response:', result);
  return result.data; 
};

function AllOrders() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !Array.isArray(data)) return <div>No orders available</div>;

  return (
    <div className="min-h-screen bg-[#fff]">
      <div>
        <div className="max-w-full flex items-center justify-between flex-wrap py-5">
          {data.map((order) => (
            <div
              key={order._id}  
              className="w-[48%] bg-[#f0f3f2] m-2 text-[#000]"
            >
              <div className="flex items-center justify-start">
                {order.cartItems?.map((item) => (
                  <div
                    className="border border-gray-300 rounded bg-white flex flex-col items-start justify-start m-2"
                    key={item.product._id}
                  >
                    <img
                      className="w-[100px] self-center"
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />
                    <div className="p-2 bg-[#fff] border border-t-slate-300 w-full text-black">
                      <h5>{item.product.title.split(" ").slice(0, 2).join(" ")}</h5>
                      <h6>Price: {item.price} EGP</h6>
                      <h6>Count: {item.count}</h6>
                    </div>
                  </div>
                ))}
              </div>
              <div className="m-2">
                <h5>Payment Method: {order.paymentMethodType || 'Unknown'}</h5>
                <h5>Order Price: {order.totalOrderPrice} EGP</h5>
                <p>
                  Shipping Address: {order.shippingAddress 
                    ? `This product is shipped to ${order.shippingAddress.city}, 
                       with a phone number of ${order.shippingAddress.phone} 
                       and details: ${order.shippingAddress.details}`
                    : 'Address information is not available'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
