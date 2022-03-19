import express from 'express';
import login from '../controllers/loginController';

const router = express.Router();

router.post('/api/user/login', login);

export default router;

/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: login api
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: user logged in successfully
 */
