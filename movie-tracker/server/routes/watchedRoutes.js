import express from 'express';
import { createWatchedEntry, deleteWatchedEntry, getMyWatched, updateWatchedEntry } from '../controllers/watchedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/mine', getMyWatched);
router.post('/', createWatchedEntry);
router.put('/:id', updateWatchedEntry);
router.delete('/:id', deleteWatchedEntry);

export default router;
