import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { usePosts } from "../atoms/usePosts";
import { userState } from "../atoms/userAtom";


const AddPost = () => {
  const user = useRecoilValue(userState); // Access user state via Recoil
  const {addPost} = usePosts();

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
      
      userId: user.id, // User ID from context
      title,
      content,
    };

    try {
      setLoading(true);

      // Send the post to the backend
      await addPost(newPost);
      navigate("/"); // Redirect to home or posts page
    } catch (error) {
      console.error("Failed to save the post:", error);
      console.log("Failed to save the post. Please try again.");
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
