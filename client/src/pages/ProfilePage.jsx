import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { usePosts } from "../atoms/usePosts";
import { useFollowers } from "../atoms/useFollowers";
import Avatar from "../components/Avatar"; // Avatar component
import HomePost from "../components/HomePost"; // HomePost component

const baseURL = import.meta.env.VITE_BACKEND_API_URL



const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useRecoilValue(userState);
  const { getPostsByUser } = usePosts();
  const { followersState, toggleFollow } = useFollowers();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState("Posts"); // Tabs: "Posts", "Followers", "Following"
  // Fetch user details and posts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await axios.get(`${baseURL}/users/${id}`);
        setProfileUser(userResponse.data);

        const userPosts = await getPostsByUser(id);
        setPosts(userPosts);

        const userFollowers = await axios.get(`${baseURL}/followers/${id}/followers`);
        const userFollowing = await axios.get(`${baseURL}/followers/${id}/following`);

        setFollowers(userFollowers.data);
        setFollowing(userFollowing.data);
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    };

    fetchProfileData();
  }, [id]);


  if (!profileUser) {
    return <div>Loading...</div>;
  }

  const isFollowing = followersState.following.some((f) => f.id === parseInt(id));

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-around items-center bg-white shadow rounded-lg p-6">
          {/* Left: Avatar and Username */}
          <div className="flex items-center gap-6">
            <Avatar size="xlarge" name={profileUser.username} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profileUser.username}
                


              </h1>
              <p className="text-sm text-gray-600">{profileUser.email}</p>
              <p className="text-sm text-gray-500">
                Joined: {new Date(profileUser.created_at).toLocaleDateString()}
              </p>

            </div>
            {currentUser && currentUser.id !== parseInt(id) && (
                  <button
                    onClick={() => toggleFollow(parseInt(id), profileUser)}
                    className={`px-6 py-2 m-2 text-sm rounded-full text-white ${isFollowing ? "bg-gray-500" : "bg-blue-500"
                      } hover:opacity-90`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
          </div>


          {/* Right: Stats */}
          <div className="flex items-center gap-8 mt-6 sm:mt-0">
            <div className="text-center">
              <h2 className="text-lg font-bold">{posts.length}</h2>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold">{followers.length}</h2>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold">{following.length}</h2>
              <p className="text-sm text-gray-600">Following</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-8 border-b border-gray-200">
          {["Posts", "Followers", "Following"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 font-medium ${activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex justify-center mt-6">
          {activeTab === "Posts" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Posts
              </h2>
              {posts.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <HomePost post={post} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No posts yet.</p>
              )}
            </div>

          )}
          {activeTab === "Followers" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {followers.map((follower) => (
                <Link to={`/profile/${follower.id}`}>
                  <div
                    key={follower.id}
                    className="flex items-center gap-4 bg-white shadow rounded-lg p-4"
                  >
                    <Avatar size="small" name={follower.username} />
                    <div>
                      <h3 className="font-bold text-gray-900">{follower.username}</h3>
                      <p className="text-sm text-gray-600">{follower.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {activeTab === "Following" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {following.map((followedUser) => (
                <Link to={`/profile/${followedUser.id}`}>
                  <div
                    key={followedUser.id}
                    className="flex items-center gap-4 bg-white shadow rounded-lg p-4"
                  >
                    <Avatar size="small" name={followedUser.username} />
                    <div>
                      <h3 className="font-bold text-gray-900">{followedUser.username}</h3>
                      <p className="text-sm text-gray-600">{followedUser.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default ProfilePage;
