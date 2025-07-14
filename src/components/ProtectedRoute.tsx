// Import the authentication context hook and Navigate component from React Router
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// This component wraps around other components/pages that should only be accessible by logged-in users
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  // Get the current user and loading state from the auth context
  const { user, loading } = useAuth();

  // If we're still checking the user's auth status, show a full-screen loading spinner
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Simple animated spinner using Tailwind CSS */}
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  // If there's no logged-in user, redirect them to the login page
  if (!user) return <Navigate to="/login" replace />;

  // If the user is logged in, render the protected children components
  return children;
}
