import express from 'express';
import categoryController from '../controllers/category';

const router = express.Router();

router.post('/api/category', categoryController.createCategory);
router.get('/api/category', categoryController.getAllCategories);
router.get('/api/category/:categoryId', categoryController.getSingleCategory);
router.patch('/api/category/:categoryId', categoryController.updateCategory);
router.delete('/api/category/:categoryId', categoryController.deleteCategory);

export default router;
