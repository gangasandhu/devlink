import db from "../config/db.js";

// Follow a user
export const followUser = async (req, res) => {
  const { followerId, followedId } = req.body;

  if (!followerId || !followedId) {
    return res.status(400).json({ message: "Both followerId and followedId are required." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO followers (followerId, followedId) VALUES (?, ?)",
      [followerId, followedId]
    );
    res.status(201).json({ message: "Followed successfully", id: result.insertId });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Failed to follow user.", error });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { followerId, followedId } = req.body;

  if (!followerId || !followedId) {
    return res.status(400).json({ message: "Both followerId and followedId are required." });
  }

  try {
    const [result] = await db.query(
      "DELETE FROM followers WHERE followerId = ? AND followedId = ?",
      [followerId, followedId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Follow relationship not found." });
    }

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Failed to unfollow user.", error });
  }
};

// Get a user's followers
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT users.id, users.username, users.email
       FROM followers
       INNER JOIN users ON followers.followerId = users.id
       WHERE followers.followedId = ?`,
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ message: "Failed to fetch followers.", error });
  }
};

// Get a user's following
export const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT users.id, users.username, users.email
       FROM followers
       INNER JOIN users ON followers.followedId = users.id
       WHERE followers.followerId = ?`,
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ message: "Failed to fetch following.", error });
  }
};

// Check follow status
export const checkFollowStatus = async (req, res) => {
  const { followerId, followedId } = req.query;

  if (!followerId || !followedId) {
    return res.status(400).json({ message: "Both followerId and followedId are required." });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM followers WHERE followerId = ? AND followedId = ?",
      [followerId, followedId]
    );

    res.status(200).json({ isFollowing: rows.length > 0 });
  } catch (error) {
    console.error("Error checking follow status:", error);
    res.status(500).json({ message: "Failed to check follow status.", error });
  }
};
