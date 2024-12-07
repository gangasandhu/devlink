// postRoutes.js
import express from 'express';
import { getAllPosts, addNewPost, getPostById, deletePost } from '../controllers/postControllers.js';

const router = express.Router();

// Get all posts
router.get('/', getAllPosts);

// Get a post by ID
router.get('/:id', getPostById);

// Add a new post
router.post('/', addNewPost);

// Delete a post by ID
router.delete('/:id', deletePost);

export default router;