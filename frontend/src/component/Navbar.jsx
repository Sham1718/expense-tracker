import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#111] border-b border-[#1f1f1f] px-8 py-4 flex justify-between items-center">

      {/* Left */}
      <Link
        to="/"
        className="text-xl font-bold text-white tracking-wide hover:text-blue-500 transition"
      >
        ExpenseTracker
      </Link>

      {/* Right */}
      <div className="flex items-center gap-6">

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium text-white"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-sm font-medium text-white"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;