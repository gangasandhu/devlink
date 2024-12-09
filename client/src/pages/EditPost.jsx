import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../atoms/usePosts";

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
        const fetchedPost = await getPostById(id); // Fetch post by ID using `usePosts`
        setPost(fetchedPost);
        setTitle(fetchedPost.title || "");
        setContent(fetchedPost.content || "");
      } catch (error) {
        console.error("Failed to fetch post data", error);
        alert("Failed to load the post. Please try again.");
        navigate("/dashboard"); // Redirect to dashboard if the post is not found
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedPost = {
      ...post,
      title,
      content,
    };

    try {
      await updatePost(id, updatedPost); // Update the post using `updatePost`
      alert("Post updated successfully!");
      navigate("/dashboard"); // Redirect to user's posts page
    } catch (error) {
      console.error("Failed to save the post", error);
      alert("Failed to save the post. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-zinc-100 min-h-screen">
        <div className="px-8 py-4 rounded bg-white drop-shadow-md max-w-4xl mx-auto">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      <div className="px-8 py-4 rounded bg-white drop-shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
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
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
