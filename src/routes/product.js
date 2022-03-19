import express from 'express';
import productController from '../controllers/productController';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.post(
  '/api/product/:categoryId',
  verifyAdmin,
  productController.createProduct
);
router.get('/api/product', productController.getAllProducts);
router.get('/api/product/:productId', productController.getSingleProduct);
router.get(
  '/api/product/category/:categoryId',
  productController.findProductByCategory
);
router.patch(
  '/api/product/:productId',
  verifyAdmin,
  productController.updateProduct
);
router.delete(
  '/api/product/:productId',
  verifyAdmin,
  productController.deleteProduct
);

export default router;

/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       productName:
 *         type: string
 *       description:
 *         type: string
 *       quantity:
 *         type: integer
 *       price:
 *         type: integer
 *
 */

/**
 * @swagger
 * /api/product/{categoryId}:
 *   post:
 *     tags:
 *       - Product
 *     summary: this api is used for creating a product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: categoryId
 *         in: path
 *         required: true
 *       - name: product
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Role created successfully
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags:
 *       - Product
 *     summary: This api is used to get all products
 *     responses:
 *         200:
 *             description: To get all products from database
 *
 */

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Retrieve single product API
 *     produces:
 *       - application/json
 *     parameters:
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
 * /api/product/{productId}:
 *  patch:
 *   tags:
 *    - Product
 *   summary: this api used to update a product
 *   description: update product
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: token
 *      in: header
 *      required: true
 *    - in: path
 *      name: productId
 *      schema:
 *       type: integer
 *      required: true
 *    - name: product
 *      in: body
 *      required: true
 *      schema:
 *       $ref: '#/definitions/Product'
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
 * /api/product/{productId}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: delete a user
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: productId
 *         description: product's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
