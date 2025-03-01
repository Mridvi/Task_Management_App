import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message for success/error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage(`Welcome ${response.data.user.name}! Redirecting...`);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      {message && <p className="text-center text-green-500">{message}</p>}
      <form onSubmit={handleLogin} className="mt-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
}







export default Login;
