// icons
import { CiEdit } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { postsState } from "../atoms/postsAtom";
import axios from "axios";
import Comments from "./Comments";
import Avatar from "./Avatar";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import "../styles/post.css";

const BlogPost = ({ post, isFollowing, toggleFollow }) => {
  console.log(post.content);
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);
  const [posts, setPosts] = useRecoilState(postsState);

  const [comments, setComments] = useState([]); // State for comments
  const [isLiked, setIsLiked] = useState(false); // Like status state


  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comments/${post.id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    const checkLikeStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/likes/check/${post.id}`, {
          params: { userId: user.id },
        });
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error("Failed to check like status:", error);
      }
    };

    fetchComments();
    if (user) {
      checkLikeStatus();
    }

  }, [post.id]);

  // Toggle like functionality
  const handleToggleLike = async () => {
    try {
      await axios.post(`http://localhost:3000/likes/toggle`, { postId: post.id, userId: user.id });
      setIsLiked((prev) => !prev);
      // setLikes((prev) => isLiked ? prev - 1 : prev + 1);
      setPosts((prevPosts) => {
        return prevPosts.map((p) => {
          if (p.id === post.id) {
            return { ...p, likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1 };
          }
          return p;
        })
      });

    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };



  const addComment = async (newComment) => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/comments", {
        postId: post.id,
        userId: user.id,
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setPosts((prevPosts) => {
        return prevPosts.map((p) => {
          if (p.id === post.id) {
            return { ...p, commentsCount: p.commentsCount + 1 };
          }
          return p;
        })
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };


  const handleEdit = () => {
    navigate(`/EditPost/${post.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Post Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Post Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Link to={`/profile/${post.userId}`} className="flex items-center gap-2">
              <Avatar name={post.username} />
              <div>
                <h1 className="text-lg font-semibold text-gray-800">{post.username}</h1>
                <p className="text-gray-500 text-sm">{post.email}</p>
              </div>
            </Link>
          </div>
          {user && user.id !== post.userId && (
            <button
              className={`px-4 py-1 rounded-lg text-sm font-semibold ${isFollowing ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"
                }`}
              onClick={() => toggleFollow(post.userId, post.username)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}

          {user && user.id === post.userId && (
            <button onClick={handleEdit} className="text-gray-500 hover:text-gray-800">
              <CiEdit size={32} />
            </button>
          )}
          {/* Like Button */}
          <button onClick={handleToggleLike} className="flex items-center gap-2">
            {isLiked ? (
              <AiFillHeart className="text-red-500 text-2xl" />
            ) : (
              <AiOutlineHeart className="text-gray-500 text-2xl" />
            )}
            <span className="text-gray-600">{post.likesCount}</span>
          </button>

        </div>

        {/* Post Content */}
        <div className="px-6 py-6 post-content">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div
            className="text-gray-700 leading-relaxed"
           >
            {parse(DOMPurify.sanitize(post.content))}
          </div>
      
        </div>

        {/* Post Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">{new Date(post.datePublished).toLocaleString()}</p>
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-800">
              <FaRegComment size={20} />
              <span>{comments.length} Comments</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <Comments comments={comments} addComment={addComment} />
    </div>
  );
};

export default BlogPost;
