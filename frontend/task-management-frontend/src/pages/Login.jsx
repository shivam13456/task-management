import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("")

  const handleSubmit = async () => {
    let response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      {
        username: username,
        password: password,
      }
    );
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition duration-300 hover:scale-[1.02]">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4 tracking-wide">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Login to your To-Do account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                //   onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox text-indigo-600 rounded focus:ring-0 mr-2"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login
