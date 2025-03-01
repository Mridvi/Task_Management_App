import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4  backdrop-blur-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        
        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: "Poppins, sans-serif" }}>
        TaskFlow
        </h1>


        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="text-white-700 hover:text-white-900">Home</Link>
          <Link to="/login" className="text-white-700 hover:text-white-900">Login</Link>
          <Link to="/register" className="text-white-700 hover:text-white-900">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
