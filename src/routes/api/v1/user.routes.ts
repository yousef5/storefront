import express from 'express';
import UserStoreController from '../../../controllers/user.controller';
import authMiddleWare from '../../../middleware/auth.middleware';
const userRoute = express.Router();
const userController = new UserStoreController();

const {
  createUser,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  authenticateUser,
} = userController;

userRoute.post('/', createUser);
userRoute.get('/', authMiddleWare, getAllUsers);
userRoute.patch('/', authMiddleWare, updateOneUser);
userRoute.get('/:id', authMiddleWare, getOneUser);
userRoute.delete('/:id', authMiddleWare, deleteOneUser);
userRoute.post('/authenticate', authenticateUser);

export default userRoute;
