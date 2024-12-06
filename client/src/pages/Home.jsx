import { useState, useEffect } from "react";
import HomePost from "../components/HomePost";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Home = ({posts}) => {
  const { user, setUser } = useUser(); // User context
  

  // TODO: for connection to backend
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-800">DevLink</h1>
        <h3 className="text-2xl font-thin">Explore</h3>
      </div>

      <ul className="p-4 flex flex-wrap gap-4 justify-center">
        {user && <li>
          {/* Link to add a new post */}
          <Link to="/addPost">
            <button className="px-4 py-3 rounded border-2 border-blue-400 flex gap-x-2 w-96 h-full text-blue-400 justify-center items-center">
              Add a post <IoMdAddCircle className="text-3xl" />
            </button>
          </Link>
        </li>}

        {/* All of the posts */}
        {posts && posts.map((post) => (
          <li key={post.postID}>
            <Link to={`/ViewPost/${post.postID}`}>
              <HomePost post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
