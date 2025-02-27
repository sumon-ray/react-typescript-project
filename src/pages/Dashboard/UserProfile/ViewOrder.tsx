// import { useGetAllOrderQuery } from "@/features/order/getAllOrders";

import { useGetAllOrderQuery } from "@/features/order/getAllOrders";

interface Order {
  _id: string;
  user: string;
  status: string;
  paymentMethod: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

const ViewOrder = () => {
  const { data, error, isLoading } = useGetAllOrderQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">User</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Payment Method</th>
              <th className="border border-gray-300 p-2">Total Price</th>
              <th className="border border-gray-300 p-2">Created At</th>
              <th className="border border-gray-300 p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order: Order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{order._id}</td>
                <td className="border border-gray-300 p-2">{order.user}</td>
                <td className="border border-gray-300 p-2">{order.status}</td>
                <td className="border border-gray-300 p-2">
                  {order.paymentMethod}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.totalPrice}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(order.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrder;
