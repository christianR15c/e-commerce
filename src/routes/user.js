import express from 'express';
import users from '../controllers/userController';

const router = express.Router();

router.post('/api/register', users.register);
router.get('/api/users', users.getAllUsers);
router.get('/api/users/:userId', users.getSingleUser);
router.delete('/api/users/:userId', users.deleteUser);
router.patch('/api/users/:userId', users.updateUser);

export default router;
