import { useState } from "react";
import axios from "axios";

function TaskForm({ setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [isHighPriority, setIsHighPriority] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to add tasks.");
      return;
    }

    try {
      const newTask = { title, description,isHighPriority };

      await axios.post("http://localhost:5000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      axios
        .get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTasks(res.data));

      setTitle("");
      setDescription("");
      
      setIsHighPriority(false);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 shadow-md rounded p-5">
      {/* Task Title Input */}
      <input
        type="text"
        placeholder="Task Title"
        className="border border-gray-500 bg-white text-gray-900 text-lg font-semibold p-3 w-full mb-3 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      {/* Task Description Input */}
      <textarea
        placeholder="Task Description"
        className="border border-gray-500 bg-white text-gray-900 text-base p-3 w-full mb-3 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

  

     
      {/* Submit Button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-4 py-3 rounded w-full shadow mt-3">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
