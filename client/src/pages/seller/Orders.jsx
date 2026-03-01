import { useEffect, useState } from "react";
import { dummyOrders } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // ✅ No backend — use dummy data
    setOrders(dummyOrders);
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={order.items[0].product.image[0]}
              alt="product"
            />

            {order.items.map((item, i) => (
              <div key={i} className="flex flex-col justify-center">
                <p className="font-medium">
                  {item.product.name}
                  {item.quantity > 1 && (
                    <span className="text-indigo-500">
                      {" "}x {item.quantity}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          <p className="font-medium text-base my-auto text-black/70">
            ₹{order.amount}
          </p>

          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentType}</p>
            <p>Date: {order.orderDate}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;