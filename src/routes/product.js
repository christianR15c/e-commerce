import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.post('/api/product/:categoryId', productController.createProduct);
router.get('/api/product', productController.getAllProducts);
router.get('/api/product/:productId', productController.getSingleProduct);
router.get(
  '/api/product/category/:categoryId',
  productController.findProductByCategory
);
router.patch('/api/product/:productId', productController.updateProduct);
router.delete('/api/product/:productId', productController.deleteProduct);

export default router;
