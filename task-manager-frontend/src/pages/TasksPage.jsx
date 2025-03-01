

import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";

function TasksPage() {
  const [tasks, setTasks] = useState([]); // All tasks
  const [filter, setFilter] = useState("all"); // Current filter
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    axios
      .get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTasks(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [token, navigate]);


  const filteredTasks = tasks.filter((task) => {
    if (filter === "high-priority") return task.isHighPriority;
    if (filter === "incomplete") return !task.isCompleted;
    return true; 
  });

  return (
    <div className="min-h-screen p-8 bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6">Your Tasks</h1>
           
       <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg mb-6 hover:bg-blue-700 transition font-semibold"
        onClick={() => navigate("/create-task")}
      >
        + Add New Task
      </button>


      {/*Task Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        {["all", "high-priority", "incomplete"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full shadow-lg transition ${
              filter === type ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setFilter(type)}
          >
            {type === "all" && "📋 All Tasks"}
            {type === "high-priority" && "🔥 High Priority"}
            {type === "incomplete" && "⏳ Incomplete"}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white shadow-lg rounded-lg p-5 transition transform hover:scale-105">
              <TaskItem task={task} setTasks={setTasks} />
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default TasksPage;


