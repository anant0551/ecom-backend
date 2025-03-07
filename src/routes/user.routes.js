import express from 'express'
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/user.controller.js'
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js'
const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

module.exports = router;
