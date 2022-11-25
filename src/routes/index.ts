import express, { Router } from 'express';
import userRoute from './api/v1/user.route';
const mainRoute: Router = express.Router();

mainRoute.use('/users', userRoute);

export default mainRoute;
