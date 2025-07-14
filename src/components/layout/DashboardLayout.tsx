// Import React and related hooks/types
import { type ReactNode, useState } from "react";
// Import NavLink for client-side navigation with active styles
import { NavLink } from "react-router-dom";
// Import the top navigation bar component
import Navbar from "../Navbar";

// DashboardLayout wraps the entire admin UI and includes the sidebar, navbar, and main content
export default function DashboardLayout({ children }: { children: ReactNode }) {
  // State to control whether the mobile sidebar is open
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Overlay for mobile sidebar (dark background that closes the sidebar when clicked) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar navigation (collapsible on mobile) */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            {/* NavLink applies styling based on active route */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold block" : "text-gray-700 block"
              }
              onClick={() => setSidebarOpen(false)} // Close sidebar on link click
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

      {/* Main content area, including the top Navbar and whatever is passed in as children */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Top Navbar with a toggle button for mobile sidebar */}
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Main page content, passed in as children */}
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
