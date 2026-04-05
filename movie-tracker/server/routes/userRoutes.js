import express from 'express';
import { createUserByAdmin, deleteUser, getUsers, updateUser } from '../controllers/userController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);
router.get('/', getUsers);
router.post('/', createUserByAdmin);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
