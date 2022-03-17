import express from 'express';
import cartController from '../controllers/cartController';
import verifyUser from '../middleware/verifyUser';

const router = express.Router();

router.post(
  '/api/addcart/:userId/:productId',
  verifyUser,
  cartController.createCart
);
router.get(
  '/api/product/oncart/:userId',
  verifyUser,
  cartController.viewProductInCart
);
router.get(
  '/api/singleproduct/oncart/:userId/:productId',
  verifyUser,
  cartController.viewSingleProduct
);
router.delete(
  '/api/deleteproduct/oncart/:userId/:productId',
  verifyUser,
  cartController.deleteProductOnCart
);
router.delete('/api/cart/:userId', verifyUser, cartController.cancelCart);

export default router;
