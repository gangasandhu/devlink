import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { postsState } from "../atoms/postsAtom";

import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import HomePost from "../components/HomePost";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const user = useRecoilValue(userState); // Access user state via Recoil
  const posts = useRecoilValue(postsState);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "All",
    author: "All",
  });

  const [categories, setCategories] = useState([]); // For dynamic category filters
  const [authors, setAuthors] = useState([]); // For dynamic author filters

  // Fetch categories and authors dynamically
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const uniqueCategories = [...new Set(posts.map((post) => post.category || "Uncategorized"))];
        const uniqueAuthors = [...new Set(posts.map((post) => post.username || "Unknown"))];
        setCategories(uniqueCategories);
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };

    fetchFilters();
  }, [posts]);

  // Filtered and searched posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = filter.category === "All" || post.category === filter.category;
    const matchesAuthor = filter.author === "All" || post.username === filter.author;

    return matchesSearch && matchesCategory && matchesAuthor;
  });

  return (
    <div className="p-6">
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-800">DevLink</h1>
        <h3 className="text-2xl font-thin">Explore</h3>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search posts..."
          className="border px-3 py-2 rounded w-full max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded w-full max-w-sm"
          value={filter.category}
          onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded w-full max-w-sm"
          value={filter.author}
          onChange={(e) => setFilter((prev) => ({ ...prev, author: e.target.value }))}
        >
          <option value="All">All Authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      <ul className="p-4 flex flex-wrap gap-4 justify-center">
        {user && (
          <li>
            {/* Link to add a new post */}
            <Link to="/addPost">
              <button className="px-4 py-3 rounded border-2 border-blue-400 flex gap-x-2 w-96 h-full text-blue-400 justify-center items-center">
                Add a post <IoMdAddCircle className="text-3xl" />
              </button>
            </Link>
          </li>
        )}

        {/* Render filtered posts */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>
                <HomePost post={post} />
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts found</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
