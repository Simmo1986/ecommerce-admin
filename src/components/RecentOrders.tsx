import { useOrders } from "../hooks/useOrders";
import Spinner from "./Spinner";

export default function RecentOrders() {
  const { orders, loading } = useOrders();

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

      {loading ? (
        <Spinner />
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="py-2">
              <div className="flex justify-between">
                <span className="font-medium">{order.customer}</span>
                <span className="text-gray-500">${order.total.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-400">{order.createdAt}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
