import express from 'express';
import checkoutController from '../controllers/checkoutController';
import verifyUser from '../middleware/verifyUser';

const router = express.Router();

router.post('/api/:cartId/checkout', verifyUser,checkoutController.checkout);

export default router;
