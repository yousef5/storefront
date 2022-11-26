import express from 'express';
import UserStoreController from '../../../controllers/user.controller';
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
userRoute.get('/', getAllUsers);
userRoute.patch('/', updateOneUser);
userRoute.get('/:id', getOneUser);
userRoute.delete('/:id', deleteOneUser);
userRoute.post('/authenticate', authenticateUser);

export default userRoute;
