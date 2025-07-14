// components/StatCard.tsx

// Import the type for icons from lucide-react
import type { LucideIcon } from "lucide-react";

// Define the expected props for the StatCard component
interface StatCardProps {
  title: string;             // The label or name of the stat (e.g., "Total Sales")
  value: string | number;    // The actual value to display (e.g., "500" or "$1,000")
  icon: LucideIcon;          // An icon component passed from lucide-react
  color?: string;            // Optional color class for the icon (default is blue)
}

// Reusable UI card to display a single statistic with an icon
export default function StatCard({ title, value, icon: Icon, color = "text-blue-500" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
      {/* Left side: stat label and value */}
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-semibold">{value}</p>
      </div>

      {/* Right side: icon, styled with dynamic color */}
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
  );
}
