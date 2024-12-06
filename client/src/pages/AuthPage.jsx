// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const AuthPage = () => {
  const { setUser } = useUser(); // Only updates user data


  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Show loading state during API call
  const [error, setError] = useState(""); // Show error messages

  const navigate = useNavigate(); // Initialize navigate


  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setFormData({ username: "", email: "", password: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Placeholder for API call
      if (isLogin) {
        // API call to login endpoint
        const response = await axios.get("http://localhost/cpsc2221/users");
        const users = response.data;
      
        console.log(formData)
        // Find the user with matching email and password
        const matchedUser = users.find(
          (user) =>
            user.email.toLowerCase() === formData.email.toLowerCase() &&
            user.password === formData.password
        );
        console.log(matchedUser)

        if (matchedUser) {
          // On successful login, set user context
          setUser({
            userID: matchedUser.userID,
            name: matchedUser.username,
            email: matchedUser.email,
          });
          alert("Logged in successfully!");
          navigate("/"); // Redirect to home
        } else {
          // Invalid email or password
          setError("Invalid email or password.");
        }
      } else {
        // API call to register endpoint
        const id = Math.floor(Math.random() * 1_000_000);
        console.log("Calling register API with:", { ...formData, userID: id, userType: 'member' });
        const response = await axios.post('http://localhost/cpsc2221/users', { ...formData, userID: id, userType: 'member', interest: 'programming', verified: 0 });
        // On successful registration:
        setUser({ userID: id, name: formData.username, email: formData.email }); // Replace with response data

      }

      navigate("/");
    } catch (err) {
      // Handle errors
      setError("An error occurred. Please try again."); // Replace with actual error message
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* Name Field for Register */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>

        {/* Toggle Button */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={handleToggle}
              className="text-blue-500 hover:underline"
              disabled={loading}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
