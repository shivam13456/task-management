import axios from "axios";
import { OpenAI } from "openai/client.js";
import { useState } from "react";

const TodoCreate = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [autoDesc, setAutoDesc] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;


  
const handleGenerateAI = async () => {
  if (!title.trim()) {
    setError("Enter a title before generating description.");
    return;
  }
  setError("");
  setLoadingAI(true);
  try {
    const res = await axios.post(`${apiBaseURL}/openai/GenerateDescription`, { title });
    setDescription(res.data.description);
    setAutoDesc(true);
  } catch (err) {
    setError("AI generation failed. Try again.");
  } finally {
    setLoadingAI(false);
  }
};



  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    const task = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      status,
      createdAt: new Date().toISOString()
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${apiBaseURL}/user/create`, task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(response.data.success) {
        setSuccess(response.data.message)
      }
    }
    catch(error) {
      console.log('Error while creating task:', error)
      setError(error.message || "Error while creating task")
    }

    if (onCreate) onCreate(task);
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("todo");
    setAutoDesc(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-3V3a1 1 0 00-1-1H9z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Create Task</h2>
          <p className="text-sm text-gray-500">Add tasks quickly — use AI to auto-fill description or write your own.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleGenerateAI}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Generate with AI
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                </svg>
              </button>
              <label className="inline-flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={autoDesc}
                  onChange={(e) => setAutoDesc(e.target.checked)}
                  className="mr-2"
                />
                Auto
              </label>
            </div>
          </div>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value); setAutoDesc(false); }}
            placeholder="Task description (you can edit after AI generation)"
            rows={4}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="todo">To-Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
            >
              Create Task
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="text-right text-xs text-gray-500">Fields marked with <span className="text-red-500">*</span> are required.</div>
      </form>
    </div>
  );
}

export default TodoCreate
