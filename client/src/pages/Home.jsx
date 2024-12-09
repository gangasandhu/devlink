import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { postsState } from '../atoms/postsAtom';

import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import HomePost from "../components/HomePost";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const user = useRecoilValue(userState); // Access user state via Recoil
  const [posts, setPosts] = useRecoilState(postsState); 

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
       
  //       const response = await axios.get("http://localhost:3000/posts");
  //       setPosts(response.data);
        
  //     } catch (err) {
       
  //       console.log(err)
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div className="p-6">
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-800">DevLink</h1>
        <h3 className="text-2xl font-thin">Explore</h3>
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

        {/* Render all posts */}
        {posts && posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <HomePost post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
