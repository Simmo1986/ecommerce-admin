import { useState, useEffect } from "react";

// Define the shape of an Order object
type Order = {
  id: string;
  customer: string;
  total: number;
  createdAt: number; // Unix timestamp in milliseconds
};

// Custom hook to fetch and manage a list of recent orders
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // Store fetched orders
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // This function will run once when the component using this hook mounts
    const fetchOrders = async () => {
      try {
        // Fetch orders from the mock API
        const res = await fetch("https://6870ae0b7ca4d06b34b788bd.mockapi.io/api/v1/Orders");
        const data = await res.json();

        // Normalize and map API data to match our `Order` type
        const mapped: Order[] = data.map((item: any) => ({
          id: item.id,
          // Try multiple fields in case the API format varies
          customer: item.Customer || item.name || "Unknown",
          total: parseFloat(item.Total || item.amount || 0),
          createdAt: Number(item.createdAt) || 0, // Ensure we store as number
        }));

        // Sort by most recent order and limit to the latest 5
        const sorted = mapped
          .sort((a, b) => b.createdAt - a.createdAt) // Most recent first
          .slice(0, 5); // Only keep the top 5

        setOrders(sorted); // Update state with the processed orders
      } catch (err) {
        // If an error occurs, log it and show empty state
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        // Hide loading spinner regardless of success/failure
        setLoading(false);
      }
    };

    fetchOrders(); // Run the async function on mount
  }, []); // Empty dependency array → runs only once

  // Return orders and loading state to the component using this hook
  return { orders, loading };
}
