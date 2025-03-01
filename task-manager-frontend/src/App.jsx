import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";


function App() {
  return (
    <div>
     

      <Navbar />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/create-task" element={<TaskFormPage />} />
        
      </Routes>
    </div>
  );
}

export default App;

