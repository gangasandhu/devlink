import db from '../config/db.js';

// Controller to add a new comment
export const addComment = async (req, res) => {
    const { postId, userId, content } = req.body;

    if (!postId || !userId || !content) {
        return res.status(400).json({ message: 'Post ID, User ID, and content are required.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO comments (postId, userId, content) VALUES (?, ?, ?)',
            [postId, userId, content]
        );

        req.params.id = result.insertId;
        const newComment = await getCommentById(req, res);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Failed to add comment:', error);
        res.status(500).json({ message: 'Error adding comment.', error });
    }
};

// Controller to get a specific comment by its ID
export const getCommentById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query(
            `SELECT 
            comments.*, 
            users.username, 
            users.email 
         FROM comments 
         INNER JOIN users ON comments.userId = users.id 
         WHERE comments.id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(200).json(rows[0]); // Return the first (and only) result
    } catch (error) {
        console.error('Failed to fetch comment by ID:', error);
        res.status(500).json({ message: 'Error fetching comment.', error });
    }
};

// Controller to get all comments for a specific post
export const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;

    try {
        const [comments] = await db.query(
            `SELECT comments.*, users.username, users.email 
       FROM comments 
       INNER JOIN users ON comments.userId = users.id 
       WHERE comments.postId = ?`,
            [postId]
        );

        res.status(200).json(comments);
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        res.status(500).json({ message: 'Error fetching comments.', error });
    }
};

// Controller to delete a comment
export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM comments WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        console.error('Failed to delete comment:', error);
        res.status(500).json({ message: 'Error deleting comment.', error });
    }
};


// controller to get comments count on the posts posted by a user
export const getCommentsCountOnUserPosts = async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
          SELECT COUNT(c.id) AS totalComments
          FROM posts p
          LEFT JOIN comments c ON p.id = c.postId
          WHERE p.userId = ?;
        `;

        // Query database to get comments count for all posts by the user
        const [result] = await db.execute(query, [userId]);

        // Extract the totalComments count
        const totalComments = result[0]?.totalComments || 0;

        return res.status(200).json({ totalComments });
    } catch (error) {
        console.error("Error fetching comments count by user:", error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};