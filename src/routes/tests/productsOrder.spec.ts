import supertest from 'supertest';
import app from '../..';
import pool from '../../databases';

import User from '../../types/user.type';
import UserStore from '../../models/user.model';

import Product from '../../types/product.type';
import ProductStore from '../../models/product.model';

import Order from '../../types/order.type';
import OrderStore from '../../models/order.model';
import ProductOrder from '../../types/product-order.type';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const request = supertest(app);
let token = '';

describe('Products in Orders Test EndPoints', () => {
  beforeAll(async () => {
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

    const connection = await pool.connect();
    const sqlQuery =
      'DELETE FROM products_orders;\nALTER SEQUENCE products_orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sqlQuery);
    connection.release();
    await userStore.create(newUser);
    await productStore.create(newProduct);
    await orderStore.create(newOrder);
  });
  afterAll(async () => {
    const connection = await pool.connect();
    const sqlQuery =
      'DELETE FROM products_orders;\nALTER SEQUENCE products_orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sqlQuery);
    connection.release();
  });

  describe('Test Authentication with its EndPoint and get Token', () => {
    it(' authenticate -> get token', async () => {
      const res = await request
        .post('/api/v1/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'johnDoe@test.com',
          password: 'secretPass',
        });
      const { email, token: getToken } = res.body.data;
      token = getToken;
      expect(email).toBe('johnDoe@test.com');
      expect(res.status).toBe(200);
    });
  });

  describe('Test CRUD EndPoints Products Orders', () => {
    it('Create EndPoint Should Create one product in  order and return this product', async () => {
      const res = await request
        .post('/api/v1/ordercontent')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_id: 1,
          order_id: 1,
          qty: 10,
        } as ProductOrder);
      const { order_id, product_id, id } = res.body.productInorder;
      expect(res.status).toBe(200);
      expect(order_id).toBe('1');
      expect(product_id).toBe('1');
      expect(id).toBe(1);
    });

    it('index EndPoint Should  return all products in order', async () => {
      const res = await request
        .get('/api/v1/ordercontent/1')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.productsInOrder).toHaveSize(1);
    });

    it('show EndPoint Should  return one product in  order', async () => {
      const res = await request
        .get('/api/v1/ordercontent/product/1/1')
        .set('Authorization', `Bearer ${token}`);

      res.body.productInOrder.order_id = parseInt(
        res.body.productInOrder.order_id,
        10
      );
      res.body.productInOrder.product_id = parseInt(
        res.body.productInOrder.product_id,
        10
      );
      const { order_id, product_id, qty } = res.body
        .productInOrder as ProductOrder;
      expect(res.status).toBe(200);
      expect(order_id).toBe(1);
      expect(product_id).toBe(1);
      expect(qty).toBe(10);
    });

    it('show EndPoint Should  update one product in  order', async () => {
      const res = await request
        .patch('/api/v1/ordercontent')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
          product_id: 1,
          order_id: 1,
          qty: 100,
          id: 1,
        } as ProductOrder);
      const { qty, id } = res.body.productInOrder;
      expect(res.status).toBe(200);
      expect(qty).toBe(100);
      expect(id).toBe(1);
    });

    it('delete EndPoint Should  return deleted product in  order', async () => {
      const res = await request
        .delete('/api/v1/ordercontent/1/1')
        .set('Authorization', `Bearer ${token}`);
      const { qty, id } = res.body.productInOrder;
      expect(res.status).toBe(200);
      expect(qty).toBe(100);
      expect(id).toBe(1);
    });
  });
});
