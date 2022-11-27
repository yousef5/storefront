import { Response, Request, NextFunction } from 'express';
import ProductStore from '../models/product.model';
import Product from '../types/product.type';

const productStore = new ProductStore();

class ProductStoreController {
  /*
   create product controller
   */
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      //! check
      if (!req.body.name || !req.body.price || !req.body.category) {
        throw new Error('missing name Or price Or category');
      }
      //? create product with model
      const product = await productStore.create(req.body as Product);

      res.status(200).json({
        status: 'success',
        message: `product created : ${product}`,
        product: product,
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get all Products
  */
  async getAllProducts(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productStore.index();
      res.status(200).json({
        status: 'success',
        products: products,
        message: 'all products ',
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get one Product
  */
  async getOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productID = parseInt(req.params.id as unknown as string);
      const product = await productStore.show(productID);
      res.status(200).json({
        status: product ? 'success' : 'failed',
        product: product,
        message: 'product not exit',
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  update one product
  */
  async updateOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const updateData: Product = req.body;
      //! check
      if (!req.body.name || !req.body.price || !req.body.category) {
        throw new Error('missing name Or price Or category');
      }

      const product = await productStore.update(updateData);

      res.status(200).json({
        status: product ? 'success' : 'failed',
        product: product,
        message: product
          ? 'product updated'
          : `product with id : ${updateData.id} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  delete one product
  */
  async deleteOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productID = parseInt(req.params.id as string);
      const product = await productStore.delete(productID);
      res.status(200).json({
        status: product ? 'success' : 'failed',
        product: product,
        message: product
          ? 'product deleted'
          : `product with id : ${productID} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductStoreController;
