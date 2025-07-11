// components/StatCard.tsx
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, color = "text-blue-500" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
  );
}
