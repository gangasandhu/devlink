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

// Get a single user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
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
