// import pool from '../../databases';
import pool from '../../databases';
import Order from '../../types/order.type';
import OrderStore from '../order.model';
import UserStore from '../user.model';
import ProductStore from '../product.model';
import ProductOrderStore from '../product-order.model';
import User from '../../types/user.type';
import Product from '../../types/product.type';
import ProductOrder from '../../types/product-order.type';

const userStore = new UserStore();
const orderStore = new OrderStore();
const productStore = new ProductStore();
const productOrderStore = new ProductOrderStore();

describe('Test Products IN Order ===> Model ', () => {
  describe('Test The Methods in Product in order are exist', () => {
    it('should have create method', () => {
      expect(productOrderStore.index).toBeDefined();
    });
    it('should have show Method', () => {
      expect(productOrderStore.show).toBeDefined();
    });
    it('should have index Method', () => {
      expect(productOrderStore.index).toBeDefined();
    });
    it('should have edit Method', () => {
      expect(productOrderStore.update).toBeDefined();
    });
    it('should have delete Method', () => {
      expect(productOrderStore.delete).toBeDefined();
    });
  });

  describe('TEST product-Order Store Logic', () => {
    const newUser = {
      email: 'johnDoe@test.com',
      user_name: 'testuser',
      first_name: 'john',
      last_name: 'doe',
      password: 'secretPass',
    } as User;
    const newProduct = {
      name: 'tv',
      description: 'good Tv with reciver',
      price: 110,
      category: 'electronic',
    } as Product;
    const newOrder = {
      status: 'active',
      user_id: 1,
    } as Order;
    const newProductInOrder = {
      product_id: 1,
      order_id: 1,
      qty: 10,
    } as ProductOrder;

    afterAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM products_orders;\nALTER SEQUENCE products_orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sqlQuery);
      connection.release();
    });
    beforeAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM products_orders;\nALTER SEQUENCE products_orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sqlQuery);
      await userStore.create(newUser);
      await productStore.create(newProduct);
      await orderStore.create(newOrder);
      connection.release();
    });
    it('Create Method : return creates Product in Order', async () => {
      const createdProductInOrder = await productOrderStore.create(
        newProductInOrder
      );
      createdProductInOrder.order_id = parseInt(
        createdProductInOrder.order_id as unknown as string
      );
      createdProductInOrder.product_id = parseInt(
        createdProductInOrder.product_id as unknown as string
      );
      createdProductInOrder.qty = parseInt(
        createdProductInOrder.qty as unknown as string
      );
      expect(createdProductInOrder).toEqual({
        id: 1,
        product_id: 1,
        order_id: 1,
        qty: 10,
      } as ProductOrder);
    });
    it('Index Method  : get all Products in one Order  with index Methods', async () => {
      const ProductsInOrder = await productOrderStore.index(1);

      expect(ProductsInOrder).toHaveSize(1);
      expect(ProductsInOrder[0].id).toBe(1);
      expect(ProductsInOrder[0].product_name).toBe('tv');
    });
    it('Show Method  : get one product in one  order when use show Methods', async () => {
      const ProductInOrder = await productOrderStore.show(1, 1);

      ProductInOrder.order_id = parseInt(
        ProductInOrder.order_id as unknown as string,
        10
      );
      ProductInOrder.product_id = parseInt(
        ProductInOrder.product_id as unknown as string,
        10
      );
      ProductInOrder.product_price = parseInt(
        ProductInOrder.product_price as unknown as string,
        10
      );
      expect(ProductInOrder).toEqual({
        id: 1,
        order_id: 1,
        product_id: 1,
        product_name: 'tv',
        product_desc: 'good Tv with reciver',
        product_price: 110,
        product_catg: 'electronic',
        qty: 10,
      } as ProductOrder);
    });

    it('Update Method : retrun updated product in order', async () => {
      const ProductInOrder = await productOrderStore.update({
        product_id: 1,
        order_id: 1,
        qty: 100,
        id: 1,
      });
      ProductInOrder.order_id = parseInt(
        ProductInOrder.order_id as unknown as string,
        10
      );
      ProductInOrder.product_id = parseInt(
        ProductInOrder.product_id as unknown as string,
        10
      );
      expect(ProductInOrder).toEqual({
        id: 1,
        product_id: 1,
        order_id: 1,
        qty: 100,
      } as ProductOrder);
    });
    it('Delete Method : get deleted Product in  order when use right id', async () => {
      const ProductInOrder = await productOrderStore.delete(1, 1);
      ProductInOrder.order_id = parseInt(
        ProductInOrder.order_id as unknown as string,
        10
      );
      ProductInOrder.product_id = parseInt(
        ProductInOrder.product_id as unknown as string,
        10
      );
      expect(ProductInOrder).toEqual({
        id: 1,
        product_id: 1,
        order_id: 1,
        qty: 100,
      } as ProductOrder);
    });
  });
});
