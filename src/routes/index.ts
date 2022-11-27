import express, { Router } from 'express';
import productRoute from './api/v1/product.routes';
import userRoute from './api/v1/user.routes';
const mainRoute: Router = express.Router();

mainRoute.use('/users', userRoute);
mainRoute.use('/products', productRoute);

export default mainRoute;
