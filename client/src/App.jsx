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


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        {posts && <Route path="/post/:id" element={<ViewPost posts={posts} />} />}
        <Route path="/auth" element={<AuthPage />} />
      
        <Route path="/code-editor" element={<CodePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<UserPostsPage  />} />

        <Route path="/addPost" element={<AddPost />} />
        <Route path="/editpost/:id" element={<EditPost />} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
