import express from 'express';
import cartController from '../controllers/cartController';

const router = express.Router();

router.post('/api/cart/:userId/:productId', cartController.createCart);
router.get('/api/product/oncart/:userId', cartController.viewProductInCart);
router.get(
  '/api/singleproduct/oncart/:userId/:productId',
  cartController.viewSingleProduct
);
router.delete(
  '/api/deleteproduct/oncart/:userId/:productId',
  cartController.deleteProductOnCart
);
router.delete('/api/cart/:userId', cartController.cancelCart);

export default router;
