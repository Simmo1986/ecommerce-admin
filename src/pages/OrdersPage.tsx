import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Spinner from "../components/Spinner";

// Type definition for each order in the list.
// Helps TypeScript enforce correct property usage.
type Order = {
  id: string;
  customer: string;
  total: number;
  createdAt: string;
};

export default function OrdersPage() {
  // State to hold the list of orders
  const [orders, setOrders] = useState<Order[]>([]);
  // State to manage whether data is still loading
  const [loading, setLoading] = useState(true);

  // useEffect is called once when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch data from the mock API
        const res = await fetch("https://6870ae0b7ca4d06b34b788bd.mockapi.io/api/v1/Orders");
        const data = await res.json();

        // Map raw data into a consistent format based on our type
        const mapped = data.map((order: any) => ({
          id: order.id,
          customer: order.Customer || "Unknown", // fallback if customer name is missing
          total: parseFloat(order.Total || 0),   // convert total from string to number
          createdAt: new Date(order.createdAt * 1000).toLocaleDateString(), // convert UNIX timestamp to readable date
        }));

        // Update state with the cleaned and formatted data
        setOrders(mapped);
      } catch (error) {
        // Handle any fetch or parsing errors
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        // Stop showing the spinner whether fetch succeeded or failed
        setLoading(false);
      }
    };

    // Invoke the fetch function
    fetchOrders();
  }, []); // Empty dependency array means this runs only once on first render

  return (
    // Dashboard layout includes the sidebar and top navigation
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {/* If we're still loading, show a spinner component */}
      {loading ? (
        <Spinner />
      ) : (
        // Table layout for displaying order data
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Total</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 text-blue-600 font-medium">#{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-2">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
