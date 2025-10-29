import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import TodoCreate from "./pages/AddTask";
import Navbar from "./components/NavBar";
import UpdateTask from "./pages/UpdateTask";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <TodoCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-task"
          element={
            <ProtectedRoute>
              <UpdateTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
