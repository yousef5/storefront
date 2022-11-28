import express from 'express';
import OrderStoreController from '../../../controllers/order.controller';
import authMiddleWare from '../../../middleware/auth.middleware';
const orderRoute = express.Router();
const orderController = new OrderStoreController();

const {
  createOrder,
  deleteOneOrder,
  getAllOrders,
  getOneOrder,
  updateOneOrder,
} = orderController;

orderRoute.post('/', authMiddleWare, createOrder);
orderRoute.get('/', authMiddleWare, getAllOrders);
orderRoute.patch('/', authMiddleWare, updateOneOrder);
orderRoute.get('/:id', authMiddleWare, getOneOrder);
orderRoute.delete('/:id', authMiddleWare, deleteOneOrder);

export default orderRoute;
