import express from 'express';
import { createReview, deleteReview, getAllReviews, getReviewsForMovie, updateReview } from '../controllers/reviewController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/movie/:movieId', protect, getReviewsForMovie);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.get('/', protect, adminOnly, getAllReviews);

export default router;
