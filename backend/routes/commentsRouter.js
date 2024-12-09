import express from 'express';
import {
  addComment,
  getCommentsByPostId,
  deleteComment,
  getCommentById,
} from '../controllers/commentsController.js';

const router = express.Router();

// Route to add a new comment
router.post('/', addComment);

// Route to get all comments for a specific post
router.get('/:postId', getCommentsByPostId);

// Route to delete a comment by ID
router.delete('/:id', deleteComment);

router.get('/comment/:id', getCommentById);
export default router;
