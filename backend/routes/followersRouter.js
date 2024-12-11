import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  checkFollowStatus,
} from "../controllers/followersController.js";

const router = express.Router();

// Follow a user
router.post("/", followUser);

// Unfollow a user
router.delete("/", unfollowUser);

// Get a user's followers
router.get("/:userId/followers", getFollowers);

// Get a user's following
router.get("/:userId/following", getFollowing);

// Check if a user is following another user
router.get("/check", checkFollowStatus);

export default router;
