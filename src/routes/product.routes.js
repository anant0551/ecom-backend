import express from 'express'
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js'
import {authenticateUser}  from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/role.middleware.js'

const router = express.Router();

router.post('/', authenticateUser , roleMiddleware('admin'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', authenticateUser , roleMiddleware('admin'), updateProduct);
router.delete('/:id', authenticateUser , roleMiddleware('admin'), deleteProduct);

export default router;
