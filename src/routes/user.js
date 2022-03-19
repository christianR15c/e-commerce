import express from 'express';
import users from '../controllers/userController';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyUser from '../middleware/verifyUser';

const router = express.Router();

router.post('/api/register', users.register);
router.get('/api/users', verifyAdmin, users.getAllUsers);
router.get('/api/users/:userId', users.getSingleUser);
router.delete('/api/users/:userId', verifyAdmin, users.deleteUser);
router.patch('/api/users/:userId', verifyUser, users.updateUser);

export default router;

// swagger documentation
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *
 */

// user registration
/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - User
 *     summary: this api is used for user registration
 *     description: User is able to register
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Role created successfully
 */

// get all users
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - User
 *     summary: This api is used to get all users registred
 *     description: get all users registered
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *     responses:
 *         200:
 *             description: To get all users from database
 *
 */

// get a single user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve single user API
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user
 */

// edit a user
/**
 * @swagger
 * /api/users/{id}:
 *  patch:
 *   tags:
 *    - User
 *   summary: this api used to update a user
 *   description: update user name
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: token
 *      in: header
 *      required: true
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of a user
 *      example: 1
 *    - in: body
 *      name: name
 *      required: true
 *      type: string
 *      description: body object
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
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: delete a user
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
