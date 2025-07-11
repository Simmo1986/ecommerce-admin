import DashboardLayout from "../components/layout/DashboardLayout";
import RecentOrders from "../components/RecentOrders";
import TopProducts from "../components/TopProducts";
import StatCard from "../components/StatCard";
import { mockStats } from "../data/mockStats";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <RecentOrders />
        <TopProducts />
      </div>
    </DashboardLayout>
  );
}
