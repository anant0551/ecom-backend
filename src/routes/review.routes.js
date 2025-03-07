import express from 'express';

import { addReview, getReviews, deleteReview } from '../controllers/review.controller.js'
import {authenticateUser}  from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/role.middleware.js'
const router = express.Router();

router.post('/:productId', authenticateUser, addReview);
router.get('/:productId', getReviews);
router.delete('/:id', authenticateUser, roleMiddleware('admin'), deleteReview);

export default router;
