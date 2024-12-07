import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import ViewPost from "./pages/ViewPost";
import CodePage from "./pages/CodePage";
import ProfilePage from "./pages/ProfilePage";
import EditPost from "./pages/EditPost";
import UserPostsPage from "./pages/UserPostsPage";
import AboutPage from "./pages/AboutPage";
import AddPost from "./pages/AddPost";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from 'recoil';
import { userState } from './atoms/userAtom';
import { postsState } from './atoms/postsAtom';

function App() {
  const [user, setUser] = useRecoilState(userState);
  const [posts, setPosts] = useRecoilState(postsState); 
  

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/check-session');
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    checkSession();
    // TODO: for connection to backend
   
  }, []);


  const deletePost = async (postID) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
        try {
            // Delete the post from the database
            alert(postID)
            await axios.delete(`http://localhost/cpsc2221/posts/${postID}`);

            // Remove the post from the local state
            const updatedPosts = posts.filter((post) => post.postID !== postID);
            setPosts(updatedPosts);

            
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete the post. Please try again.");
        }
    }
};


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        {posts && <Route path="/ViewPost/:id" element={<ViewPost posts={posts} />} />}
        <Route path="/auth" element={<AuthPage />} />
      
        <Route path="/codeedit" element={<CodePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<UserPostsPage posts={posts} deletePost={deletePost} />} />

        <Route path="/addPost" element={<AddPost />} />
        <Route path="/EditPost/:id" element={<EditPost posts={posts} setPosts={setPosts} />} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
