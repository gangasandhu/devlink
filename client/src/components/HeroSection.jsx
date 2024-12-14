import React from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import LogoIcon from "../assets/LogoIcon";


const HeroSection = ({ user }) => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Build, Share, and Collaborate with <span className="text-blue-500">DevLink</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Your go-to platform for tech blogs, collaborative projects, and community-driven insights. Join the movement!
        </p>
        {user && (
          <Link to="/addPost">
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow hover:bg-blue-500 transition">
              <IoMdAddCircle className="inline-block mr-2 text-xl" />
              Add Your First Post
            </button>
          </Link>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300">
          <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
            <LogoIcon className="text-blue-500 w-6 h-6" />
            <div>
              <h2 className="text-lg font-semibold">Create Content</h2>
              <p className="text-sm">Share your ideas and tech blogs with the world.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
            <LogoIcon className="text-blue-500 w-6 h-6" />
            <div>
              <h2 className="text-lg font-semibold">Discover Insights</h2>
              <p className="text-sm">Explore blogs, guides, and tutorials from other developers.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
            <LogoIcon className="text-blue-500 w-6 h-6" />
            <div>
              <h2 className="text-lg font-semibold">Collaborate</h2>
              <p className="text-sm">Connect with others and work together on amazing projects.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
