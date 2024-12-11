import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { usePosts } from "../atoms/usePosts";
import { useFollowers } from "../atoms/useFollowers";

const ProfilePage = () => {
  const { id } = useParams(); // Get user ID from URL
  const currentUser = useRecoilValue(userState); // Current logged-in user
  const { getPostsByUser } = usePosts(); // Function to fetch user posts
  const { followersState, toggleFollow } = useFollowers();

  const [profileUser, setProfileUser] = useState(null); // Profile being viewed
  const [posts, setPosts] = useState([]); // User's posts
  const [followers, setFollowers] = useState([]); // User's followers
  const [following, setFollowing] = useState([]); // User's following

  // Fetch user details and posts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(`http://localhost:3000/users/${id}`);
        setProfileUser(userResponse.data);

        // Fetch user's posts
        const userPosts = await getPostsByUser(id);
        setPosts(userPosts);

        const userFollowers = await axios.get(`http://localhost:3000/followers/${id}/followers`);
        const userFollowing = await axios.get(`http://localhost:3000/followers/${id}/following`);

        if (currentUser && currentUser.id === parseInt(id)) {
          setFollowers(followersState.followers);
          setFollowing(followersState.following);
        } else {
          setFollowers(userFollowers.data);
          setFollowing(userFollowing.data);
        }

      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    };

    fetchProfileData();
  }, [id, currentUser]);

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  const isFollowing = followersState.following.some((f) => f.id === parseInt(id));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
            {profileUser.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profileUser.username}</h1>
            <p className="text-gray-500">{profileUser.email}</p>
            <p className="text-gray-400 text-sm">Joined: {new Date(profileUser.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Follow Button */}
        {currentUser && currentUser.id !== parseInt(id) && (
          <button
            onClick={() => toggleFollow(parseInt(id), profileUser)}
            className={`px-6 py-2 rounded ${isFollowing
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 text-white"
              }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-8 border-t border-b py-4">
        <div className="text-center">
          <p className="text-lg font-bold">{posts.length}</p>
          <p className="text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{followers.length}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{following.length}</p>
          <p className="text-gray-500">Following</p>
        </div>
      </div>


      {/* Recent Posts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        {posts.slice(0, 5).length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 5).map((post) => (
              <Link key={post.id} to={`/post/${post.id}`} className="block">
                <li key={post.id} className="border rounded-lg p-4 shadow">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-gray-500">{post.content.substring(0, 100)}...</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Published: {new Date(post.datePublished).toLocaleDateString()}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent posts available</p>
        )}
      </div>
          
        {/* Followers */}
      <div>
        <h2 className="text-xl font-bold mt-8">Followers</h2>
        {followers.length > 0 ? followers.map((follower) => (
          <Link key={follower.id} to={`/profile/${follower.id}`} className="flex items-center gap-4 mt-4">
          <div key={follower.id} className="flex items-center gap-4 mt-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
              {follower.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold">{follower.username}</h3>
              <p className="text-gray-500">{follower.email}</p>
            </div>
          </div>
        </Link>
        )) : 
        <p className="text-gray-500">No followers yet</p>
        }
      </div>
    </div>
  );
};

export default ProfilePage;
