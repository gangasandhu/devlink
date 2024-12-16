import express from 'express';
import { toggleLike, checkLikeStatus, getLikesCount, getLikesCountOnUserPosts } from '../controllers/likesController.js';

const router = express.Router();

// Route to toggle like
router.post('/toggle', toggleLike);

// Route to check like status
router.get('/check/:postId', checkLikeStatus);

// Route to get likes count
router.get('/count/:postId', getLikesCount);

// Route to get likes count on all the posts posted by a user
router.get('/count/user/:userId', getLikesCountOnUserPosts);

export default router;
