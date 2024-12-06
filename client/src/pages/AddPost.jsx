import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the user context
import axios from "axios";

const AddPost = ({ addPosts }) => {
  const { user } = useUser(); // Get the user data from context
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth")
  }

  const handleSave = async () => {
    if (!title || !content) {
      alert("Please fill out all fields.");
      return;
    }


    const newPost = {
      
      userID: user.userID, // User ID from context
      title,
      content,
    };

    try {
      setLoading(true);

      // Send the post to the backend
      console.log(newPost)
      const response = await axios.post("http://localhost/cpsc2221/posts", newPost);
      const createdPost = response.data.post;
      // Update the posts state in the parent component
      if (addPosts) {
        // addPosts({...newPost, username: user.name, email: user.email, datePublished: new Date().toISOString().slice(0, 19).replace('T', ' ')});
        addPosts(createdPost)
      }

      alert("Post added successfully!");
      navigate("/"); // Redirect to home or posts page
    } catch (error) {
      console.error("Failed to save the post:", error);
      alert("Failed to save the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      <div className="px-8 py-4 rounded bg-white drop-shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-4"
        >
          <label className="flex flex-col">
            <span className="font-semibold">Title</span>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-300 rounded px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold">Content</span>
            <textarea
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="border-2 border-gray-300 rounded px-3 py-2"
              required
            />
          </label>
          <button
            type="submit"
            className={`${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold py-2 px-4 rounded`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
