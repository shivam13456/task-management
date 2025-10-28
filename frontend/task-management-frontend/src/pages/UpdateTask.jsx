import { useState, useEffect } from "react";

const UpdateTask = ({ onUpdate, existingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || "");
      setDescription(existingTask.description || "");
      setDueDate(existingTask.dueDate ? existingTask.dueDate.split("T")[0] : "");
      setStatus(existingTask.status || "todo");
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage("Title is required.");
      return;
    }
    const updatedTask = {
      id: existingTask._id,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      status,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedTask);
    setMessage("Task updated successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Update Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="todo">To-Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
