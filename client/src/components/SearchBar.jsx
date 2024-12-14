import React, { useState } from "react";
import SearchIcon from "../assets/search.svg";

const SearchBar = ({ searchQuery, setSearchQuery, searchType, setSearchType }) => {
  return (
    <div className="py-8 bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4">
          {/* Search Category Selector */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Search by Title</option>
            <option value="author">Search by Author</option>
          </select>

          {/* Search Input */}
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder={`Search ${searchType === "title" ? "titles" : "authors"}...`}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 text-gray-500 hover:text-blue-500">
            <img src={SearchIcon} alt="Search" />
            </button>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4">
          Explore blog posts by title or discover authors contributing to the community.
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
