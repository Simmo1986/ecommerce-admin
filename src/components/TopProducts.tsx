import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  sales: number;
};

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your real or fake API endpoint
    const fetchTopProducts = async () => {
      try {
        const res = await fetch("https://6870ae0b7ca4d06b34b788bd.mockapi.io/api/v1/product");
        const data = await res.json();
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name || "Unnamed Product",
          sales: parseInt(item.sales) || 0,
        }));

        const sorted = mapped.sort((a, b) => b.sales - a.sales).slice(0, 5);
        setProducts(sorted);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Top Products</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
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
