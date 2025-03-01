import { useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

function TaskItem({ task, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [isHighPriority, setIsHighPriority] = useState(task.isHighPriority);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const token = localStorage.getItem("token");

  // Toggle High Priority
  const togglePriority = async () => {
    try {
      const updatedTask = { ...task, isHighPriority: !isHighPriority };

      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsHighPriority(!isHighPriority);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, isHighPriority: !isHighPriority } : t))
      );
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  // Toggle Completion
  const toggleCompletion = async () => {
    try {
      const updatedTask = { ...task, isCompleted: !isCompleted };

      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsCompleted(!isCompleted);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, isCompleted: !isCompleted } : t))
      );
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  // Edit Task
  const handleEdit = async () => {
    try {
      const updatedTask = { title, description,isHighPriority, isCompleted };

      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      axios
        .get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTasks(res.data));

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md mb-4 w-full max-w-md bg-white ${
        isHighPriority ? "border-l-8 border-red-600" : "border-l-4 border-gray-300"
      }`}
    >
      {isEditing ? (
        <div className="w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2 text-gray-900 font-semibold text-lg"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-2 text-gray-900 text-base"
          />
        

          <div className="flex space-x-3 mt-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={handleEdit}>
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          
          <h3 className={`font-bold text-lg text-gray-900 ${isCompleted ? "line-through" : ""}`}>
            {task.title}
          </h3>
          
          <p className="text-base text-gray-800">{task.description}</p>


          
          <div className="flex flex-wrap justify-between items-center mt-3 space-x-2">
            {/* Priority Toggle */}
            <button onClick={togglePriority} className="text-2xl">
              {isHighPriority ? "❤️" : "🤍"}
            </button>

            {/* Completion Toggle */}
            <button
              onClick={toggleCompletion}
              className={`px-3 py-1 rounded text-white ${
                isCompleted ? "bg-green-500 hover:bg-green-600 mt-3" : "bg-gray-500 hover:bg-gray-600 mt-3"
              }`}
            >
              {isCompleted ? "✔️ Completed" : "🔲 Mark as Done"}
            </button>

 

                    
          <div className="flex justify-end space-x-4 mt-2">
            <button className="text-blue-600 hover:text-blue-800" onClick={() => setIsEditing(true)}>
              <Edit size={20} />
            </button>
            <button className="text-red-600 hover:text-red-800" onClick={handleDelete}>
              <Trash2 size={20} />
            </button>
          </div>
        </div>
          </div>
        
      )}
    </div>
  );
}

export default TaskItem;
