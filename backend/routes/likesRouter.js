import express from 'express';
import { toggleLike, checkLikeStatus, getLikesCount } from '../controllers/likesController.js';

const router = express.Router();

// Route to toggle like
router.post('/toggle', toggleLike);

// Route to check like status
router.get('/check/:postId', checkLikeStatus);

// Route to get likes count
router.get('/count/:postId', getLikesCount);

export default router;
