import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useUser(); // User context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setUser(null); // Clears the user state on logout
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-xl font-bold">DevLink</div>

          {/* Navigation Links */}
          <div className="hidden sm:flex space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/codeedit"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Code Editor
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
          </div>

          {/* Login/Register or User Avatar */}
          <div className="relative">
            {user ? (
              <div>
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-600 text-white font-medium cursor-pointer"
                    title={user.name}
                    onClick={toggleDropdown}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="text-gray-300 ml-2 text-sm font-medium">
                    {user.name}
                  </span>
                  {/* Dropdown */}

                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Your Posts
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>

                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
