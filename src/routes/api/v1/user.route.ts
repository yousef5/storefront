import express from 'express';
import UserStoreController from '../../../controllers/user.controller';
const userRoute = express.Router();
const userController = new UserStoreController();

const { createUser } = userController;

userRoute.post('/', createUser);

export default userRoute;
