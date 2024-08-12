import { Router } from 'express';
import { updateUser, deleteUser, getUserDetails } from '../controllers.ts/userController';
import authMiddleware from '../utils/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getUserDetails);
router.put('/update', authMiddleware, updateUser);
router.delete('/delete', authMiddleware, deleteUser);

export default router;