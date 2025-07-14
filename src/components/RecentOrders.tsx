// Import a custom hook that fetches orders and a loading spinner component
import { useOrders } from "../hooks/useOrders";
import Spinner from "./Spinner";

export default function RecentOrders() {
  // Get `orders` and `loading` state from the custom hook
  const { orders, loading } = useOrders();

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

      {/* Show a spinner while orders are being fetched */}
      {loading ? (
        <Spinner />
      ) : (
        // Render the list of recent orders once loading is complete
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="py-2">
              <div className="flex justify-between">
                {/* Show the customer's name */}
                <span className="font-medium">{order.customer}</span>

                {/* Format the order total to 2 decimal places with a dollar sign */}
                <span className="text-gray-500">${order.total.toFixed(2)}</span>
              </div>

              {/* Show the date the order was created */}
              <div className="text-sm text-gray-400">{order.createdAt}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
