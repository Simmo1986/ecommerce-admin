import { useState, useEffect } from "react";

type Order = {
  id: string;
  customer: string;
  total: number;
  createdAt: number; // ← Added this line
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://6870ae0b7ca4d06b34b788bd.mockapi.io/api/v1/Orders");
        const data = await res.json();

        const mapped: Order[] = data.map((item: any) => ({
          id: item.id,
          customer: item.Customer || item.name || "Unknown",
          total: parseFloat(item.Total || item.amount || 0),
          createdAt: Number(item.createdAt) || 0, // ← Map it here
        }));

        // ✅ Sort by createdAt descending and limit to 5
        const sorted = mapped.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

        setOrders(sorted);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading };
}
