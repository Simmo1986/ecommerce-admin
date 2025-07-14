// Import authentication context to access the current user and logout function
import { useAuth } from "../../context/AuthContext";

// Navbar component receives a prop to toggle the sidebar (used in mobile view)
export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  // Destructure logout function and user info from the auth context
  const { logout, user } = useAuth();

  // When the logout button is clicked, sign the user out
  const handleLogout = async () => {
    try {
      await logout(); // Trigger logout (handled via Firebase)
    } catch (err) {
      console.error("Logout failed", err); // Log any errors to the console
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      {/* Hamburger button for toggling sidebar (only visible on smaller screens) */}
      <button onClick={onToggleSidebar} className="md:hidden text-2xl">
        ☰
      </button>

      {/* App title in the center */}
      <h1 className="text-xl font-semibold">E-Commerce Admin</h1>

      {/* Right side: user email and logout button */}
      <div className="flex items-center gap-4 text-sm">
        {/* Show the logged-in user's email, but only on small screens and up */}
        <span className="text-gray-600 hidden sm:inline">{user?.email}</span>

        {/* Logout button with styling and hover effect */}
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
