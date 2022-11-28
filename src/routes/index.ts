import express, { Router } from 'express';
import productRoute from './api/v1/product.routes';
import userRoute from './api/v1/user.routes';
import orderRoute from './api/v1/order.routes';
import productOrderRoute from './api/v1/productOrder.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/users', userRoute);
mainRoute.use('/products', productRoute);
mainRoute.use('/orders', orderRoute);
mainRoute.use('/ordercontent', productOrderRoute);

export default mainRoute;
