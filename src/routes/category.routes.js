import express from 'express'
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category.controller.js'
const router = express.Router();
import {authenticateUser}  from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/role.middleware.js'

router.post('/', authenticateUser, roleMiddleware('admin'), createCategory);
router.get('/', getCategories);
router.put('/:id', authenticateUser, roleMiddleware('admin'), updateCategory);
router.delete('/:id', authenticateUser, roleMiddleware('admin'), deleteCategory);

export default router;
