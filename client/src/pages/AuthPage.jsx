import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoIcon from "../assets/LogoIcon";

axios.defaults.withCredentials = true; // Include credentials (cookies) in all requests

const AuthPage = () => {
  const [user, setUser] = useRecoilState(userState); // Global user state
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setFormData({ username: "", email: "", password: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? "http://localhost:3000/auth/login" : "http://localhost:3000/auth/register";

    try {
      const { data } = await axios.post(endpoint, formData);
      setUser(data.user); // Update global user state with user information
      navigate("/"); // Redirect to the main page after successful login/register
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <LogoIcon className="h-12 w-12" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Welcome Back!" : "Join DevLink"}
        </h2>
        <p className="text-sm text-center text-gray-600 mt-2">
          {isLogin ? "Login to access your account" : "Create an account to start sharing your ideas"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter your name"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg text-sm font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={handleToggle}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-xs mt-4">
        © {new Date().getFullYear()} DevLink. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthPage;
