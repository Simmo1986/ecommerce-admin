import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate
import { useAuth } from "../context/AuthContext"; // Custom hook for auth logic

export default function LoginPage() {
  // Access the `login` function from the authentication context
  const { login } = useAuth();

  // React Router hook for navigation after login
  const navigate = useNavigate();

  // State variables to hold form inputs and any error message
  const [email, setEmail] = useState("");       // User input for email
  const [password, setPassword] = useState(""); // User input for password
  const [error, setError] = useState("");       // Error message to display on login failure

  // This function runs when the form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission (page refresh)

    try {
      // Attempt to log in with the provided credentials
      await login(email, password);

      // If successful, navigate to the home/dashboard page
      navigate("/");
    } catch (err) {
      // If login fails (e.g. wrong credentials), show an error message
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        {/* Display error message if login fails */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state as user types
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // HTML5 validation: can't submit if empty
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state as user types
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
