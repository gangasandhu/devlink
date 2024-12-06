import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = ({ posts, setPosts }) => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Fetch the post data on mount
  useEffect(() => {
    // Find the post from the local state
    const foundPost = posts.find((p) => p.postID === parseInt(id));

    if (foundPost) {
      console.log(foundPost)
      setPost(foundPost);
      setTitle(foundPost.title || "");
      setContent(foundPost.content || "");
    } else {
      // If not found locally, fetch it from the database
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost/cpsc2221/posts/${id}`);
          const { title, content } = response.data;
          console.log(response.data)
          setPost(response.data);
          setTitle(title || "");
          setContent(content || "");
        } catch (error) {
          console.error("Failed to fetch post data", error);
          alert("Failed to load the post. Please try again.");
          navigate("/"); // Redirect to home if the post is not found
        }
      };

      fetchPost();
    }
  }, [id, posts, navigate]);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedPost = {...post,
      title,
      content,
    };

    try {
      // Update the post in the database
      console.log(id, updatedPost)
      await axios.patch(`http://localhost/cpsc2221/posts/${id}`, updatedPost);

      // Update the local posts state
      const updatedPosts = posts.map((p) =>
        p.postID === parseInt(id) ? { ...p, ...updatedPost } : p
      );
      setPosts(updatedPosts);

      alert("Post updated successfully!");
      navigate("/dashboard"); // Redirect to user's posts page
    } catch (error) {
      console.error("Failed to save the post", error);
      alert("Failed to save the post. Please try again.");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
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
