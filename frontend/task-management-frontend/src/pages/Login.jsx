import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  let apiBaseURL = import.meta.env.VITE_API_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")


    if(!username.trim() || !password.trim()) {
        setErrorMsg("Please Enter both Username and Password")
    }
    try {
        setLoading(true)
        let response = await axios.post(
            `${apiBaseURL}/auth/login`,
            {
                username: username,
                password: password,
            });

            if(response.data.success) {
                setSuccessMsg('Login Successful')
                localStorage.setItem("isLoggedIn", true)
                localStorage.setItem("token", response.data.user.token)
                if(rememberMe) {
                    localStorage.setItem('username', username)
                    localStorage.setItem('password', password)
                }
                else {
                    localStorage.removeItem('username')
                    localStorage.removeItem('password')
                }
                setTimeout(() => {
                    window.location.href = '/create-task'
                }, 1200)
            }
            else {
                setErrorMsg(response.data.message || "Invalid credentials");
            }
        }   
        catch(error) {
            setErrorMsg('Error while logging', error || 'Something went wrong')
            console.log(error)
        }
        finally {
            setLoading(false)
        }
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox text-indigo-600 rounded focus:ring-0 mr-2"
                />
                Remember me
              </label>
            </div>
            {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-sm text-center">{successMsg}</p>}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition duration-200 shadow-md ${
                loading
                    ? "bg-indigo-400 cursor-not-allowed text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}>
                {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login
