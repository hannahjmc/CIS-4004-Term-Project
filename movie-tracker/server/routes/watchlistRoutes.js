import express from 'express';
import { createWatchlistEntry, deleteWatchlistEntry, getMyWatchlist, updateWatchlistEntry } from '../controllers/watchlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/mine', getMyWatchlist);
router.post('/', createWatchlistEntry);
router.put('/:id', updateWatchlistEntry);
router.delete('/:id', deleteWatchlistEntry);

export default router;
