import express from 'express';
import ProductStoreController from '../../../controllers/product.controller';
import authMiddleWare from '../../../middleware/auth.middleware';
const productRoute = express.Router();
const productController = new ProductStoreController();

const {
  createProduct,
  deleteOneProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
} = productController;

productRoute.post('/', authMiddleWare, createProduct);
productRoute.get('/', getAllProducts);
productRoute.patch('/', authMiddleWare, updateOneProduct);
productRoute.get('/:id', getOneProduct);
productRoute.delete('/:id', authMiddleWare, deleteOneProduct);

export default productRoute;
