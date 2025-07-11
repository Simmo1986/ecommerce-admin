import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Spinner from "../components/Spinner";

// Type definition for our customer insights data.
// This helps TypeScript check the shape of the customer objects we're working with.
type CustomerInsight = {
  name: string;
  ordersCount: number;
  totalSpent: number;
  averageOrder: number;
  firstOrderDate: string;
  lastOrderDate: string;
};

export default function UsersPage() {
  // State to store the list of customer insight objects
  const [customers, setCustomers] = useState<CustomerInsight[]>([]);
  // Loading state to control when to show the spinner vs data
  const [loading, setLoading] = useState(true);

  // useEffect runs the fetch logic once when the component first mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders from the MockAPI endpoint
        const res = await fetch("https://6870ae0b7ca4d06b34b788bd.mockapi.io/api/v1/Orders");
        const data = await res.json();

        // We'll group orders by customer name to build customer insights
        const grouped: Record<string, CustomerInsight & { rawDates: number[] }> = {};

        data.forEach((order: any) => {
          // Get customer name and fallback to "Unknown" if missing
          const name = order.Customer || "Unknown";
          // Parse the total amount (string → number), fallback to 0
          const total = parseFloat(order.Total) || 0;
          // Convert the Unix timestamp to a JS date (multiply by 1000)
          const created = order.createdAt ? parseInt(order.createdAt) * 1000 : Date.now();

          // If this customer isn't in the grouped object, initialize their data
          if (!grouped[name]) {
            grouped[name] = {
              name,
              ordersCount: 1,
              totalSpent: total,
              averageOrder: total,
              rawDates: [created], // Store raw dates for later processing
              firstOrderDate: "",
              lastOrderDate: "",
            };
          } else {
            // If already added, update their stats
            grouped[name].ordersCount += 1;
            grouped[name].totalSpent += total;
            grouped[name].rawDates.push(created);
          }
        });

        // Map the grouped data into a clean array for the UI
        const insights = Object.values(grouped).map((c) => {
          const dates = c.rawDates.sort(); // Sort dates to get first/last
          return {
            name: c.name,
            ordersCount: c.ordersCount,
            totalSpent: c.totalSpent,
            averageOrder: c.totalSpent / c.ordersCount,
            firstOrderDate: new Date(dates[0]).toLocaleDateString(),
            lastOrderDate: new Date(dates[dates.length - 1]).toLocaleDateString(),
          };
        });

        // Update the state with the computed customer insights
        setCustomers(insights);
      } catch (err) {
        // In case of error, log and reset customer state
        console.error("Failed to fetch customer insights:", err);
        setCustomers([]);
      } finally {
        // Whether success or failure, hide the loading spinner
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchOrders();
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Customer Insights</h1>

      {/* Show spinner while loading */}
      {loading ? (
        <Spinner />
      ) : (
        // Grid layout for responsive customer insight cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c) => (
            <div key={c.name} className="bg-white shadow rounded-xl p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">{c.name}</h2>
              <p className="text-sm text-gray-500">Orders: {c.ordersCount}</p>
              <p className="text-sm text-gray-500">
                Avg Order: ${c.averageOrder.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Total Spent: ${c.totalSpent.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">
                First Order: {c.firstOrderDate}
              </p>
              <p className="text-xs text-gray-400">
                Last Order: {c.lastOrderDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
