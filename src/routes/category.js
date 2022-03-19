import express from 'express';
import categoryController from '../controllers/category';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.post('/api/category', verifyAdmin, categoryController.createCategory);
router.get('/api/category', categoryController.getAllCategories);
router.get('/api/category/:categoryId', categoryController.getSingleCategory);
router.patch(
  '/api/category/:categoryId',
  verifyAdmin,
  categoryController.updateCategory
);
router.delete(
  '/api/category/:categoryId',
  verifyAdmin,
  categoryController.deleteCategory
);

export default router;

/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       categoryName:
 *         type: string
 *
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     tags:
 *       - Category
 *     summary: create category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: category
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: category created successfully
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     tags:
 *       - Category
 *     summary: get all categories
 *     responses:
 *         200:
 *             description: To get all categories from database
 *
 */

/**
 * @swagger
 * /api/category/{categoryId}:
 *   get:
 *     tags:
 *       - Category
 *     summary: get single category
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
 *         description: A single category
 */

/**
 * @swagger
 * /api/category/{categoryId}:
 *  patch:
 *   tags:
 *    - Category
 *   summary: update category
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: token
 *      in: header
 *      required: true
 *    - in: path
 *      name: categoryId
 *      schema:
 *       type: integer
 *      required: true
 *    - name: category
 *      in: body
 *      required: true
 *      schema:
 *       $ref: '#/definitions/Category'
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
 * /api/category/{categoryId}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: delete a category
 *     description: Deletes a single category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: categoryId
 *         description: category's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
