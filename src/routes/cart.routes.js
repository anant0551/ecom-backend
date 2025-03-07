import express from 'express'
import { addToCart, getCart, updateCartItem, removeFromCart } from '../controllers/cart.controller.js'
import { authenticateUser } from '../middlewares/auth.middleware.js'
const router = express.Router();

router.post('/', authenticateUser, addToCart);
router.get('/', authenticateUser, getCart);
router.put('/:id', authenticateUser, updateCartItem);
router.delete('/:id', authenticateUser, removeFromCart);

export default router;
