import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { postsState } from "../atoms/postsAtom";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import HomePost from "../components/HomePost";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

const Home = () => {
  const user = useRecoilValue(userState);
  const posts = useRecoilValue(postsState);


  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title"); // "title" or "author"

  // Filter posts based on search query and type
  useEffect(() => {
    const filterPosts = () => {
      const filteredPosts = posts.filter((post) => {
        if (searchType === "title") {
          return post.title.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchType === "author") {
          return post.username.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      });

      setFilteredPosts(filteredPosts);
    }
    filterPosts();
  }, [posts]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <HeroSection user={user} />

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
      />

      {/* Posts Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <li key={post.id} className="col-span-1">
                <HomePost post={post} />
              </li>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center">No posts found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
