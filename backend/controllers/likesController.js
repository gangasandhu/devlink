import db from '../config/db.js';

export const toggleLike = async (req, res) => {
    const { userId, postId } = req.body;

    try {
        // Check if the like already exists
        const [existingLike] = await db.query(
            `SELECT * FROM likes WHERE userId = ? AND postId = ?`,
            [userId, postId]
        );

        if (existingLike.length > 0) {
            // If the like exists, remove it (unlike)
            await db.query(
                `DELETE FROM likes WHERE userId = ? AND postId = ?`,
                [userId, postId]
            );
            return res.status(200).json({ message: 'Post unliked successfully.' });
        } else {
            // Otherwise, add a like
            await db.query(
                `INSERT INTO likes (userId, postId) VALUES (?, ?)`,
                [userId, postId]
            );
            return res.status(201).json({ message: 'Post liked successfully.' });
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        return res.status(500).json({ error: 'Failed to toggle like. Please try again.' });
    }
};

export const checkLikeStatus = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.query; // Pass userId as a query parameter

    try {
        // Check if the like exists
        const [likeStatus] = await db.query(
            `SELECT * FROM likes WHERE userId = ? AND postId = ?`,
            [userId, postId]
        );

        const isLiked = likeStatus.length > 0;

        return res.status(200).json({ isLiked });
    } catch (error) {
        console.error('Error checking like status:', error);
        return res.status(500).json({ error: 'Failed to check like status. Please try again.' });
    }
};

export const getLikesCount = async (req, res) => {
    const { postId } = req.params;

    try {
        // Query to count likes for the given postId
        const [result] = await db.query(
            `SELECT COUNT(*) AS likesCount FROM likes WHERE postId = ?`,
            [postId]
        );

        const likesCount = result[0].likesCount;

        return res.status(200).json({ likesCount });
    } catch (error) {
        console.error('Error fetching likes count:', error);
        return res.status(500).json({ error: 'Failed to fetch likes count. Please try again.' });
    }
};
