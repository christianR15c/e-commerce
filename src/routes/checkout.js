import express from 'express';
import checkoutController from '../controllers/checkoutController';
import verifyUser from '../middleware/verifyUser';

const router = express.Router();

router.post('/api/:cartId/checkout', verifyUser, checkoutController.checkout);

export default router;

/**
 * @swagger
 * /api/{cartId}/checkout:
 *   post:
 *     tags:
 *       - Checkout
 *     summary: checkout
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: cartId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: checkout success
 */
