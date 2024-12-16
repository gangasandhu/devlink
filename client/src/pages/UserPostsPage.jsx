import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { usePosts } from "../atoms/usePosts";

const UserPostsPage = () => {
  const user = useRecoilValue(userState); // Access user state via Recoil
  const { deletePost, getPostsByUser } = usePosts(); // Access deletePost and getPostsByUser functions

  const [userPosts, setUserPosts] = useState([]); // Local state for user's posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user's posts from API
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        try {
          const posts = await getPostsByUser(user.id); // Fetch posts by user ID
          setUserPosts(posts);
        } catch (err) {
          console.error("Failed to fetch user posts:", err);
          setError("Failed to load posts. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, getPostsByUser]);

  // Render loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <p className="text-gray-500">Loading your posts...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-gray-100">
      {/* Dashboard Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your posts and see an overview of your activity.</p>
        </div>
        <Link
          to="/addPost"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + New Post
        </Link>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">{userPosts.length}</h2>
          <p className="text-gray-600">Total Posts</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {userPosts.reduce((acc, post) => acc + (post.likesCount || 0), 0)}
          </h2>
          <p className="text-gray-600">Total Likes</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {userPosts.reduce((acc, post) => acc + (post.commentsCount || 0), 0)}
          </h2>
          <p className="text-gray-600">Total Comments</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Published</th>
              <th className="py-2 px-4">Likes</th>
              <th className="py-2 px-4">Comments</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{post.title}</td>
                <td className="py-2 px-4">{new Date(post.datePublished).toLocaleDateString()}</td>
                <td className="py-2 px-4">{post.likesCount || 0}</td>
                <td className="py-2 px-4">{post.commentsCount || 0}</td>
                <td className="py-2 px-4 space-x-2">
                  <Link
                    to={`/editpost/${post.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {userPosts.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No recent posts to show.</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 shadow rounded-lg">
          <h3 className="text-lg font-bold text-blue-600 mb-2">How to Write Better Posts</h3>
          <p className="text-gray-600 text-sm">
            Learn how to structure and optimize your blog posts for better engagement.
          </p>
          <Link to="/guides/writing-tips" className="text-blue-500 hover:underline mt-2 block">
            Learn More →
          </Link>
        </div>
        <div className="bg-green-100 p-6 shadow rounded-lg">
          <h3 className="text-lg font-bold text-green-600 mb-2">Analyze Post Performance</h3>
          <p className="text-gray-600 text-sm">
            Use our analytics tools to track the performance of your posts.
          </p>
          <Link to="/analytics" className="text-green-500 hover:underline mt-2 block">
            View Analytics →
          </Link>
        </div>
        <div className="bg-yellow-100 p-6 shadow rounded-lg">
          <h3 className="text-lg font-bold text-yellow-600 mb-2">Create New Content</h3>
          <p className="text-gray-600 text-sm">
            Ready to share more with your audience? Start writing a new post now!
          </p>
          <Link to="/addPost" className="text-yellow-500 hover:underline mt-2 block">
            Start Writing →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPostsPage;
