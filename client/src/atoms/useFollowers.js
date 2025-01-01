// src/hooks/useFollowers.js
import { useRecoilState, useRecoilValue } from "recoil";
import { followersAtom } from "../atoms/followersAtom";
import { userState } from "../atoms/userAtom";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_API_URL


export const useFollowers = () => {
  const currentUser = useRecoilValue(userState); // Logged-in user
  const [followersState, setFollowersState] = useRecoilState(followersAtom); // Followers atom state

  // Fetch followers and following for the current user
  const fetchFollowers = async () => {
    if (!currentUser || !currentUser.id) return;

    try {
      const [followersResponse, followingResponse] = await Promise.all([
        axios.get(`${baseURL}/followers/${currentUser.id}/followers`),
        axios.get(`${baseURL}/followers/${currentUser.id}/following`),
      ]);

      setFollowersState({
        followers: followersResponse.data,
        following: followingResponse.data,
      });
    } catch (error) {
      console.error("Failed to fetch followers data:", error);
    }
  };

  // Toggle follow/unfollow for a specific user
  const toggleFollow = async (followedId, username) => {
    const isFollowing = followersState.following.some((user) => user.id === followedId);

    try {
      if (isFollowing) {
        // Unfollow user
        await axios.delete(`${baseURL}/followers`, {
          data: { followerId: currentUser.id, followedId },
        });
        setFollowersState((prev) => ({
          ...prev,
          following: prev.following.filter((user) => user.id !== followedId),
        }));
      } else {
        // Follow user
        const response = await axios.post(`${baseURL}/followers`, {
          followerId: currentUser.id,
          followedId,
        });
        setFollowersState((prev) => ({
          ...prev,
          following: [...prev.following, { id: followedId, username }],
        }));
      }
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
  };

  return {
    followersState,
    fetchFollowers,
    toggleFollow,
  };
};
