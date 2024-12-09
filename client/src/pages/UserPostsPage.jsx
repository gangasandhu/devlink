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
            <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
                <p className="text-gray-500">Loading your posts...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Blog Posts</h1>

            {userPosts.length > 0 ? (
                <ul className="space-y-4">
                    {userPosts.map((post) => (
                        <li
                            key={post.id}
                            className="p-4 border rounded-lg shadow hover:shadow-md"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                                <div className="space-x-2">
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
                                </div>
                            </div>
                            <p className="text-gray-600 mt-2">{post.content}</p>
                            <p className="text-gray-400 text-sm mt-1">
                                Published on: {post.datePublished}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">You have not created any posts yet.</p>
            )}
        </div>
    );
};

export default UserPostsPage;
