import express from 'express';
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from '../controllers/movieController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMovies);
router.get('/:id', protect, getMovieById);
router.post('/', protect, adminOnly, createMovie);
router.put('/:id', protect, adminOnly, updateMovie);
router.delete('/:id', protect, adminOnly, deleteMovie);

export default router;
