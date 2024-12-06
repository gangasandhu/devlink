import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, username, email FROM users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Add a new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        res.status(201).json({ id: result.insertId, username, email });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router;
