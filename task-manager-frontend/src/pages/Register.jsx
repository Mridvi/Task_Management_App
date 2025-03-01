import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      {message && <p className="text-center text-green-500">{message}</p>}
      <form onSubmit={handleRegister} className="mt-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
  );
}








export default Register;
