import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { postsState } from '../atoms/postsAtom';
import { usePosts } from "../atoms/usePosts";


const UserPostsPage = () => {
    const user = useRecoilValue(userState); // Access user state via Recoil
    const posts = useRecoilValue(postsState); // Access posts state via Recoil
    const {deletePost} = usePosts(); // Access editPost and deletePost functions
    

    const [userPosts, setUserPosts] = useState([]); // Local state for user's posts

    // Filter posts by logged-in user
    useEffect(() => {
        if (user) {
            const filteredPosts = posts.filter((post) => post.userId === user.id);
            setUserPosts(filteredPosts);
        }
    }, []);


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
