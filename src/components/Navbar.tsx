// Import the authentication context to access the current user and logout function
import { useAuth } from "../context/AuthContext";

// The Navbar accepts a prop `onToggleSidebar` for toggling the sidebar (usually on mobile)
export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { logout, user } = useAuth(); // Get the current user and logout function from auth context

  // Handle logout click — calls the logout function and catches any errors
  const handleLogout = async () => {
    try {
      await logout(); // Logs the user out using Firebase auth
    } catch (err) {
      console.error("Logout failed", err); // Log any errors for debugging
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      {/* Mobile hamburger button (hidden on medium and larger screens) */}
      <button onClick={onToggleSidebar} className="md:hidden text-2xl">
      ☰
      </button>

      {/* App Title */}
      <h1 className="text-xl font-semibold">E-Commerce Admin</h1>

      {/* Right-side: user email and logout button */}
      <div className="flex items-center gap-4 text-sm">
      {/* Show user email if available, but only on screens sm and up */}
      <span className="text-gray-600 hidden sm:inline">{user?.email}</span>

      {/* Logout button with basic styling */}
      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Logout
      </button>
      </div>
    </header>
  );
}
