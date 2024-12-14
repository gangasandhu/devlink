import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usePosts } from "../atoms/usePosts";
import { userState } from "../atoms/userAtom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddPost = () => {
  const user = useRecoilValue(userState); // Access user state via Recoil
  const { addPost } = usePosts();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate("/auth");
  }

  const handleSave = async () => {
    if (!title || !content) {
      toast.error("Please fill out all fields.");
      return;
    }
  
    const newPost = {
      userId: user.id, // User ID from context
      title,
      content,
    };
  
    try {
      setLoading(true);
      await addPost(newPost); // Save post
      toast.success("Post published successfully!");
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard
      }, 3000); // Matches the autoClose duration of the toast
    } catch (error) {
      console.error("Failed to save the post:", error);
      toast.error("Failed to save the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-200 border-2 py-6 px-8">
          <h1 className="text-3xl font-bold text-stone-900">Create a New Post</h1>
          <p className="text-sm mt-1 text-gray-500">
            Share your knowledge, ideas, and updates with the community.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter a catchy title for your post"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Post Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={10}
                placeholder="Write your post content here..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 text-lg font-semibold rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-950"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Publish Post"}
            </button>
          </form>
        </div>

        {/* Additional Section */}
        <div className="bg-gray-50 px-8 py-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Writing Tips:
          </h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Keep your title short and engaging.</li>
            <li>Use clear and concise language.</li>
            <li>Break down complex ideas into smaller sections.</li>
            <li>Include links or references if necessary.</li>
            <li>Proofread before publishing!</li>
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default AddPost;
