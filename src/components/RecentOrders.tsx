import { useOrders } from "../hooks/useOrders";

export default function RecentOrders() {
  const { orders, loading } = useOrders();

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="py-2 flex justify-between">
            <span>{order.customer}</span>
            <span className="text-gray-500">${order.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
