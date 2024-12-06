import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT posts.*, users.username, users.email
            FROM posts
            INNER JOIN users ON posts.userId = users.id
        `);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});

// Add a new post
router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)',
            [title, content, userId]
        );
        res.status(201).json({ id: result.insertId, title, content, userId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

export default router;
