import { mockOrders } from "../data/mockOrders";

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="py-2">Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map((order) => (
            <tr key={order.id} className="border-b last:border-none">
              <td className="py-2">{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
