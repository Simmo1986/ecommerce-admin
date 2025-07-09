import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input" />
      <button className="btn mt-2">Login</button>
    </form>
  );
}