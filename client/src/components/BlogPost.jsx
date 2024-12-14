import { IoIosMore } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import axios from "axios";
import Comments from "./Comments";
import Avatar from "./Avatar";

const BlogPost = ({ post, isFollowing, toggleFollow }) => {
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);

  const [comments, setComments] = useState([]); // State for comments


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

    fetchComments();
  }, [post.id]);




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
              <IoIosMore size={24} />
            </button>
          )}
        </div>

        {/* Post Content */}
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
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
