import { type ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold block" : "text-gray-700 block"
              }
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold block" : "text-gray-700 block"
              }
              onClick={() => setSidebarOpen(false)}
            >
              Orders
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold block" : "text-gray-700 block"
              }
              onClick={() => setSidebarOpen(false)}
            >
              Users
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
