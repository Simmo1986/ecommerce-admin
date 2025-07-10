import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      {/* Hamburger for mobile */}
      <button onClick={onToggleSidebar} className="md:hidden text-2xl">
        ☰
      </button>

      <h1 className="text-xl font-semibold">E-Commerce Admin</h1>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-600 hidden sm:inline">{user?.email}</span>
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
