// Import necessary hooks and types from React and Firebase
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../lib/firebase"; // Import the configured Firebase auth instance

// Create an authentication context.
// This will be used to share auth-related state and functions across the app.
const AuthContext = createContext(null);

// This component will wrap parts of your app that need access to authentication state.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // `user` holds the current logged-in Firebase user (or null if not logged in)
  const [user, setUser] = useState<User | null>(null);
  
  // `loading` is true while we check if the user is already logged in (e.g., on page reload)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up a listener to track the auth state (logged in/out)
    // Firebase will call this function whenever the auth state changes
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);          // Update the user state with the current user (or null)
      setLoading(false);   // We're done checking the auth state
    });

    // Return the unsubscribe function to clean up the listener when the component unmounts
    return unsub;
  }, []);

  // Login function using Firebase's signInWithEmailAndPassword
  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  // Logout function using Firebase's signOut
  const logout = () => signOut(auth);

  // Provide the auth-related values to the children of this component
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext from other components
// This is a cleaner way to use `useContext(AuthContext)` elsewhere in your app
export const useAuth = () => useContext(AuthContext);
