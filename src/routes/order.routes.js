import express from 'express'
import { placeOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/order.controller.js'
import { authenticateUser } from '../middlewares/auth.middleware.js'
const router = express.Router();

router.post('/', authenticateUser, placeOrder);
router.get('/', authenticateUser, getOrders);
router.get('/:id', authenticateUser, getOrderById);
router.put('/:id/status', authenticateUser, updateOrderStatus);

export default router;
