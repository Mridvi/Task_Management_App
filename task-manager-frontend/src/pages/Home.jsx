
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb]">
      <h1 className="text-4xl font-bold text-center">Welcome to TaskFlow</h1>
      <p className="text-lg text-center mt-2">
        Organize your tasks effortlessly. Stay productive and track your progress with ease.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {!token ? (
          <>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded shadow-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded shadow-md"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded shadow-md"
              onClick={() => navigate("/tasks")}
            >
              View Tasks
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded shadow-md"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;



