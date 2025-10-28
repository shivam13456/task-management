import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold tracking-wide">
              ToDoApp
            </span>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="text-white hover:text-gray-200 transition duration-200">Home</Link>
            <Link to="/create-task" className="text-white hover:text-gray-200 transition duration-200">Create</Link>
            <Link to="/update-task" className="text-white hover:text-gray-200 transition duration-200">Update</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-indigo-700">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-indigo-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/create-task" className="block px-4 py-2 text-white hover:bg-indigo-500" onClick={() => setMenuOpen(false)}>Create</Link>
          <Link to="/update-task" className="block px-4 py-2 text-white hover:bg-indigo-500" onClick={() => setMenuOpen(false)}>Update</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
