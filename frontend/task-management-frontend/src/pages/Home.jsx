import { useEffect, useState } from "react";
import axios from "axios";
import UpdateTask from "./UpdateTask";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/ReadTask`
      );
      setTasks(response.data.data);
      setFilteredTasks(response.data.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(value) ||
        task.description.toLowerCase().includes(value)
    );
    setFilteredTasks(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/DeleteTask`, {
        id,
      });
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setConfirmDeleteId(null);
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/user/DeleteTask`
      );
      setTasks([]);
      setFilteredTasks([]);
      setConfirmDeleteAll(false);
    } catch (error) {
      console.log("Error deleting all tasks:", error);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/UpdateTask`,
        updatedTask
      );
      const updatedTasks = tasks.map((t) =>
        t._id === updatedTask.id ? { ...t, ...updatedTask } : t
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setUpdateModal(false);
      setTaskToUpdate(null);

      setSuccessMessage("Task updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center p-6">
      {successMessage && (
        <div className="fixed top-5 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fadeIn">
          {successMessage}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setConfirmDeleteAll(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              Delete All
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          <ul className="space-y-4">
            {filteredTasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow-sm"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h2>
                  <p className="text-gray-600 truncate w-64">
                    {task.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-xl hover:bg-blue-600 transition"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => {
                      setTaskToUpdate(task);
                      setUpdateModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-xl hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(task._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-11/12 max-w-md transform transition-all scale-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              Task Details
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Title:</span> {selectedTask.title}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {selectedTask.description}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {selectedTask.status}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Due Date:</span>{" "}
              {selectedTask.dueDate
                ? new Date(selectedTask.dueDate).toLocaleDateString()
                : "Not set"}
            </p>
            <div className="text-right">
              <button
                onClick={() => setSelectedTask(null)}
                className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {updateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-2xl my-10 relative">
            <button
              onClick={() => {
                setUpdateModal(false);
                setTaskToUpdate(null);
              }}
              className="absolute top-3 right-3 bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-800"
            >
              ✕
            </button>
            <UpdateTask onUpdate={handleUpdate} existingTask={taskToUpdate} />
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Delete Task?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteAll && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Delete All Tasks?
            </h2>
            <p className="text-gray-600 mb-6">
              This will permanently remove all your tasks.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Yes, Delete All
              </button>
              <button
                onClick={() => setConfirmDeleteAll(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
