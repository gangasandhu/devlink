import db from '../config/db.js';

// Controller to get all posts
export const getAllPosts = async (req, res) => {
    const { userId } = req.query;

    try {
        let query = `
            SELECT posts.*, users.username, users.email
            FROM posts
            INNER JOIN users ON posts.userId = users.id
        `;
        const params = [];

        // If userId is provided, filter by userId
        if (userId) {
            query += ' WHERE posts.userId = ?';
            params.push(userId);
        }

        const [rows] = await db.query(query, params);

        if (userId && rows.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Controller to get a post by ID
export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT posts.*, users.username, users.email
            FROM posts
            INNER JOIN users ON posts.userId = users.id
            WHERE posts.id = ?
        `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};
// Controller to add a new post
export const addNewPost = async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)',
            [title, content, userId]
        );

        // Use getPostById to retrieve the newly created post
        req.params.id = result.insertId;
        await getPostById(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

// Controller to delete a post by ID
export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};

// Controller to update a post by ID
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const [result] = await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const updatedPost = await getPostById(req, res);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
};

