import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

function TaskFormPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb]">
      <h1 className="text-3xl font-bold text-white mb-4">Create a New Task</h1>

      {/* Task Form */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <TaskForm />
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/tasks")}
        >
          Back to Tasks
        </button>
      </div>
    </div>
  );
}

export default TaskFormPage;
