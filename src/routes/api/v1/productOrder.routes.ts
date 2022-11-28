import express from 'express';
import ProductOrderController from '../../../controllers/productOrder.controller';
import authMiddleWare from '../../../middleware/auth.middleware';
const productOrderRoute = express.Router();
const productOrderController = new ProductOrderController();

const {
  addOneProductInOrder,
  deleteProductInOrder,
  getProductInOrder,
  getProductsInOrder,
  updateProductInOrder,
} = productOrderController;

productOrderRoute.post('/', authMiddleWare, addOneProductInOrder);
productOrderRoute.get('/:orderID', authMiddleWare, getProductsInOrder);
productOrderRoute.patch('/', authMiddleWare, updateProductInOrder);
productOrderRoute.get(
  '/product/:orderID/:productID',
  authMiddleWare,
  getProductInOrder
);
productOrderRoute.delete(
  '/:orderID/:productID',
  authMiddleWare,
  deleteProductInOrder
);

export default productOrderRoute;
