// Import React hooks and a loading spinner component
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

// Define the shape of a Product object
type Product = {
  id: string;
  name: string;
  sales: number;
};

export default function TopProducts() {
  // State to store the list of top products
  const [products, setProducts] = useState<Product[]>([]);

  // State to track whether data is still being loaded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function fetches product data from an API
    const fetchTopProducts = async () => {
      try {
        // Replace this URL with your real API in production
        const res = await fetch("https://6870ae0b7ca4d06b34b788bd.mockapi.io/api/v1/product");
        const data = await res.json();

        // Map the raw API data into a consistent format
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name || "Unnamed Product", // Fallback name if missing
          sales: parseInt(item.sales) || 0,     // Convert sales to a number, default to 0
        }));

        // Sort the products by sales in descending order and take the top 5
        const sorted = mapped.sort((a, b) => b.sales - a.sales).slice(0, 5);

        // Update state with the sorted products
        setProducts(sorted);
      } catch (err) {
        // Log the error and show an empty list if fetch fails
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        // Stop showing the loading spinner
        setLoading(false);
      }
    };

    // Call the function when the component first mounts
    fetchTopProducts();
  }, []); // Empty dependency array = run only once on mount

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Top Products</h2>

      {/* Show spinner while loading, otherwise render product list */}
      {loading ? (
        <Spinner />
      ) : (
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="py-2 flex justify-between">
              <span>{product.name}</span>
              <span className="text-gray-500">{product.sales} sold</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
