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
router.patch(
  '/api/updateproduct/oncart/:userId/:productId',
  verifyUser,
  cartController.updateQuantity
);
router.delete(
  '/api/deleteproduct/oncart/:userId/:productId',
  verifyUser,
  cartController.deleteProductOnCart
);
router.delete('/api/cart/:userId', verifyUser, cartController.cancelCart);

export default router;

/**
 * @swagger
 * definitions:
 *   Cart:
 *     properties:
 *       quantity:
 *         type: integer
 *
 */

/**
 * @swagger
 * /api/addcart/{userId}/{productId}:
 *   post:
 *     tags:
 *       - Cart
 *     summary: add a product to a cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: userId
 *         in: path
 *         required: true
 *       - name: productId
 *         in: path
 *         required: true
 *       - name: cart
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Cart'
 *     responses:
 *       200:
 *         description: add product to cart
 */

/**
 * @swagger
 * /api/product/oncart/{userId}:
 *   get:
 *     tags:
 *       - Cart
 *     summary: get all products on cart
 *     parameters:
 *       - name: userId
 *         description: user id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *         200:
 *             description: To get all products on cart
 *
 */

/**
 * @swagger
 * /api/singleproduct/oncart/{userId}/{productId}:
 *   get:
 *     tags:
 *       - Cart
 *     summary: get single product on cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: user id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: productId
 *         description: product id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single product
 */

/**
 * @swagger
 * /api/product/category/{categoryId}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Retrieve products in a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: category id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A all products in category
 */

/**
 * @swagger
 * /api/updateproduct/oncart/{userId}/{productId}:
 *  patch:
 *   tags:
 *    - Cart
 *   summary: change quantity of product on cart
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: token
 *      in: header
 *      required: true
 *    - in: path
 *      name: userId
 *      schema:
 *       type: integer
 *      required: true
 *    - in: path
 *      name: productId
 *      schema:
 *       type: integer
 *      required: true
 *    - name: quantity
 *      in: body
 *      schema:
 *       $ref: '#/definitions/Cart'
 *   requestBody:
 *    content:
 *     application/json
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json
 */

/**
 * @swagger
 * /api/deleteproduct/oncart/{userId}/{productId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: delete a product on cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: productId
 *         description: product's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: delete a cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
