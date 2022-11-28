import { Response, Request, NextFunction } from 'express';
import OrderStore from '../models/order.model';
import Order from '../types/order.type';

const orderStore = new OrderStore();

class OrderStoreController {
  /*
   create order controller
   */
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      //! check
      if (!req.body.status || !req.body.user_id) {
        throw new Error('missing status Or userID ');
      }
      //? create order with model
      const order = await orderStore.create(req.body as Order);

      res.status(200).json({
        status: 'success',
        message: `order created : ${order.id}`,
        order: order,
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get all orders
  */
  async getAllOrders(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderStore.index();
      res.status(200).json({
        status: 'success',
        orders: orders,
        message: 'all Orders ',
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get one order
  */
  async getOneOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderID = parseInt(req.params.id as unknown as string);
      const order = await orderStore.show(orderID);
      res.status(200).json({
        status: order ? 'success' : 'failed',
        order: order,
        message: order
          ? 'order retrun'
          : `order with id : ${orderID} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  update one order
  */
  async updateOneOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const updateData: Order = req.body;
      //! check
      if (!req.body.status || !req.body.user_id) {
        throw new Error('missing status Or userID');
      }

      const order = await orderStore.update(updateData);

      res.status(200).json({
        status: order ? 'success' : 'failed',
        order: order,
        message: order
          ? 'order updated'
          : `order with id : ${updateData.id} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  delete one order
  */
  async deleteOneOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderID = parseInt(req.params.id as string);
      const order = await orderStore.delete(orderID);
      res.status(200).json({
        status: order ? 'success' : 'failed',
        order: order,
        message: order
          ? 'order deleted'
          : `order with id : ${orderID} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderStoreController;
