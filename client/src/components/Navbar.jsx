import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import axios from "axios";

// Importing SVG assets
import MenuIcon from "../assets/MenuIcon.jsx";
import CloseIcon from "../assets/CloseIcon.jsx";
import LogoIcon from "../assets/LogoIcon.jsx"; // Custom DevLink logo

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState); // User state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown menu state
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/auth");
    } catch (err) {
      console.error("Error during logout:", err);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <nav className="bg-gray-950 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-400">
            <LogoIcon className="h-8 w-8" />
            <span className="text-xl font-bold">DevLink</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-white hover:text-gray-400"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex sm:space-x-6 sm:items-center w-full sm:w-auto absolute sm:static top-16 left-0 sm:top-auto bg-black sm:bg-transparent z-10 sm:z-auto`}
          >
            <Link
              to="/"
              className="block px-3 py-2 text-gray-300 hover:text-white text-sm font-medium sm:inline"
            >
              Home
            </Link>
            <Link
              to="/code-editor"
              className="block px-3 py-2 text-gray-300 hover:text-white text-sm font-medium sm:inline"
            >
              Code Editor
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-300 hover:text-white text-sm font-medium sm:inline"
            >
              About
            </Link>
          </div>

          {/* User Menu or Login */}
          <div className="relative">
            {user ? (
              <div>
                <div className="flex items-center space-x-4 cursor-pointer">
                  <Avatar size="medium" name={user.username} onClick={() => setIsDropdownOpen((prev) => !prev)} />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <Link
                          to={`/profile/${user.id}`}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Your Posts
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
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
