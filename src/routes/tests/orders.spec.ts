import supertest from 'supertest';
import app from '../..';
import pool from '../../databases';
import User from '../../types/user.type';
import UserStore from '../../models/user.model';
import Order from '../../types/order.type';

const userStore = new UserStore();
const request = supertest(app);
let token = '';

describe('Orders Test EndPoints', () => {
  beforeAll(async () => {
    const testUser = {
      email: 'test@test.com',
      user_name: 'test',
      first_name: 'test',
      last_name: 'test',
      password: 'test4test',
    } as User;

    const connection = await pool.connect();
    const sqlQuery = `DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await connection.query(sqlQuery);
    connection.release();
    await userStore.create(testUser);
  });
  afterAll(async () => {
    const connection = await pool.connect();
    const sqlQuery = `DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await connection.query(sqlQuery);
    connection.release();
  });

  describe('Test Authentication with its EndPoint and get Token', () => {
    it(' authenticate -> get token', async () => {
      const res = await request
        .post('/api/v1/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'test4test',
        });
      const { email, token: getToken } = res.body.data;
      token = getToken;
      expect(email).toBe('test@test.com');
      expect(res.status).toBe(200);
    });
  });

  describe('Test CRUD EndPoints Orders', () => {
    it('Create EndPoint Should Create order and return order', async () => {
      const res = await request
        .post('/api/v1/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'active',
          user_id: 1,
        } as Order);
      console.log(res.body.order);

      const { user_id, id, status } = res.body.order;
      expect(res.status).toBe(200);
      expect(status).toBe('active');
      expect(id).toBe(1);
      expect(user_id).toBe('1');
    });

    it('index EndPoint Should  return all orders', async () => {
      const res = await request
        .get('/api/v1/orders')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.orders).toHaveSize(1);
    });

    it('show EndPoint Should  return order', async () => {
      const res = await request
        .get('/api/v1/orders/1')
        .set('Authorization', `Bearer ${token}`);
      const { user_id, id, status } = res.body.order;
      expect(res.status).toBe(200);
      expect(status).toBe('active');
      expect(user_id).toBe('1');
      expect(id).toBe(1);
    });

    it('show EndPoint Should  update and return update order', async () => {
      const res = await request
        .patch('/api/v1/orders')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
          status: 'complete',
          user_id: 1,
          id: 1,
        } as Order);
      const { user_id, id, status } = res.body.order;
      expect(res.status).toBe(200);
      expect(status).toBe('complete');
      expect(user_id).toBe('1');
      expect(id).toBe(1);
    });

    it('delete EndPoint Should  return deleted order', async () => {
      const res = await request
        .delete('/api/v1/orders/1')
        .set('Authorization', `Bearer ${token}`);
      const { id, status } = res.body.order;
      expect(res.status).toBe(200);
      expect(status).toBe('complete');
      expect(id).toBe(1);
    });
  });
});
