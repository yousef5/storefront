import { Response, Request, NextFunction } from 'express';
import ProductOrder from '../types/product-order.type';
import ProductOrderStore from '../models/product-order.model';

const productOrderStore = new ProductOrderStore();

class ProductOrderController {
  /*
   add one product in order
   */
  async addOneProductInOrder(req: Request, res: Response, next: NextFunction) {
    try {
      //! check
      if (!req.body.order_id || !req.body.product_id || !req.body.qty) {
        throw new Error('missing order_id Or product_id or qty');
      }
      //? create order with model
      const productInorder = await productOrderStore.create(
        req.body as ProductOrder
      );

      res.status(200).json({
        status: 'success',
        message: `product In order created : ${productInorder.id}`,
        productInorder: productInorder,
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get all products or records in one order
  */
  async getProductsInOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderID = parseInt(req.params.orderID as unknown as string, 10);
      const productsInOrder = await productOrderStore.index(orderID);
      res.status(200).json({
        status: 'success',
        productsInOrder: productsInOrder,
        message: 'all Products in orders ',
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get one record or product in one order
  */
  async getProductInOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderID = parseInt(req.params.orderID as unknown as string);
      const productID = parseInt(req.params.productID as unknown as string);
      const productInOrder = await productOrderStore.show(orderID, productID);

      res.status(200).json({
        status: productInOrder ? 'success' : 'failed',
        productInOrder: productInOrder,
        message: productInOrder
          ? 'productInOrder retrun'
          : `productInOrder with id : ${productID} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  update one record or product in one order
  */
  async updateProductInOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const updateData: ProductOrder = req.body;
      //! check
      if (!req.body.order_id || !req.body.product_id || !req.body.qty) {
        throw new Error('missing order_id Or product_id or qty');
      }

      const productInOrder = await productOrderStore.update(updateData);

      res.status(200).json({
        status: productInOrder ? 'success' : 'failed',
        productInOrder: productInOrder,
        message: productInOrder
          ? 'productInOrder updated'
          : `productInOrder with id : ${updateData.id} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  delete one record or product in one order
  */
  async deleteProductInOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderID = parseInt(req.params.orderID as unknown as string);
      const productID = parseInt(req.params.productID as unknown as string);
      const productInOrder = await productOrderStore.delete(orderID, productID);
      res.status(200).json({
        status: productInOrder ? 'success' : 'failed',
        productInOrder: productInOrder,
        message: productInOrder
          ? 'productInOrder deleted'
          : `productInOrder with id : ${productID} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductOrderController;
