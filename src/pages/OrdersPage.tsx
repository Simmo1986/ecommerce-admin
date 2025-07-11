import { useState, useEffect } from "react";

type Order = {
  id: string;
  customer: string;
  total: number;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://6870ae0b7ca4d06b34b788bd.mockapi.io/api/v1/Orders");
        const data = await res.json();

        const mapped = data.map((order: any) => ({
          id: order.id,
          customer: order.Customer || "Unknown",
          total: parseFloat(order.Total || 0),
          createdAt: new Date(order.createdAt * 1000).toLocaleDateString(),
        }));

        setOrders(mapped);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : (
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
    </div>
  );
}
