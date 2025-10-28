import { useState } from "react";

const UpdateTask = ({ onUpdate }) => {
  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!taskId.trim() || !title.trim()) {
      setError("Task ID and Title are required.");
      return;
    }
    setError("");
    const updatedTask = {
      id: taskId.trim(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      status,
      updatedAt: new Date().toISOString()
    };
    if (onUpdate) onUpdate(updatedTask);
    setSuccess("Task updated successfully!");
    setTimeout(() => setSuccess(""), 2000);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 010 2.828L9.172 13.657l-4.95 1.414 1.414-4.95 8.243-8.243a2 2 0 012.828 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Update Task</h2>
          <p className="text-sm text-gray-500">Modify task details and save the updated version.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Task ID <span className="text-red-500">*</span></label>
          <input
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            placeholder="Enter task ID to update"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter updated task title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Update task description"
            rows={4}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="todo">To-Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700"
            >
              Update Task
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 010 2.828L9.172 13.657l-4.95 1.414 1.414-4.95 8.243-8.243a2 2 0 012.828 0z" />
              </svg>
            </button>
          </div>
        </div>

        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        <div className="text-right text-xs text-gray-500">Fields marked with <span className="text-red-500">*</span> are required.</div>
      </form>
    </div>
  );
};

export default UpdateTask;
