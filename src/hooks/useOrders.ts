import { useState, useEffect } from "react";
import { mockOrders } from "../data/mockOrders";

type Order = {
  id: string;
  customer: string;
  total: number;
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(mockOrders); // Simulate network delay
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { orders, loading };
}
