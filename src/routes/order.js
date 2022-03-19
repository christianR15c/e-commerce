import express from 'express';
import orderController from '../controllers/orderController';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyUser from '../middleware/verifyUser';

const router = express.Router();

router.post('/api/order/:cartId', verifyUser, orderController.order);
router.get('/api/order/all/:userId', verifyAdmin, orderController.getUserOrder);
router.get(
  '/api/order/:userId/:orderId',
  verifyUser,
  orderController.getSinlgeOrder
);
router.delete(
  '/api/order/:userId/:orderId',
  verifyUser,
  orderController.deleteOrder
);

export default router;
