import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../atoms/usePosts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const { getPostById, updatePost } = usePosts(); // Use `getPostById` and `updatePost` functions

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id); // Fetch post by ID
        setPost(fetchedPost);
        setTitle(fetchedPost.title || "");
        setContent(fetchedPost.content || "");
      } catch (error) {
        console.error("Failed to fetch post data", error);
        toast.error("Failed to load the post. Redirecting...");
        setTimeout(() => navigate("/dashboard"), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleSave = async () => {
    if (!title || !content) {
      toast.error("Please fill out all fields.");
      return;
    }

    const updatedPost = { ...post, title, content };

    try {
      await updatePost(id, updatedPost); // Update the post
      toast.success("Post updated successfully!");
      setTimeout(() => navigate("/dashboard"), 3000); // Redirect after showing success toast
    } catch (error) {
      console.error("Failed to save the post", error);
      toast.error("Failed to save the post. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <ToastContainer />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-200 border-2 py-6 px-8">
          <h1 className="text-3xl font-bold text-stone-900">Edit Your Post</h1>
          <p className="text-sm mt-1 text-gray-500">
            Make changes to your post and save them for the community.
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
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-50 px-8 py-6">
          <h2 className="text-lg font-semibold text-gray-800">Editing Tips:</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Keep your title clear and concise.</li>
            <li>Update your content with recent information.</li>
            <li>Double-check for grammar and spelling errors.</li>
            <li>Engage your audience with a personal touch.</li>
            <li>Save changes after proofreading!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
