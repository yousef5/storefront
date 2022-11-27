import supertest from 'supertest';
import app from '../..';
import pool from '../../databases';
import User from '../../types/user.type';
import UserStore from '../../models/user.model';
import Product from '../../types/product.type';

const userStore = new UserStore();
const request = supertest(app);
let token = '';

describe('Product Test EndPoints', () => {
  beforeAll(async () => {
    const testUser = {
      email: 'test@test.com',
      user_name: 'test',
      first_name: 'test',
      last_name: 'test',
      password: 'test4test',
    } as User;
    const connection = await pool.connect();
    const sqlQuery = `DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1`;
    const sqlQuery2 = `DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1`;
    await connection.query(sqlQuery);
    await connection.query(sqlQuery2);
    connection.release();
    await userStore.create(testUser);
  });
  afterAll(async () => {
    const connection = await pool.connect();
    const sqlQuery = `DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1`;
    const sqlQuery2 = `DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1`;
    await connection.query(sqlQuery);
    await connection.query(sqlQuery2);
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

  describe('Test CRUD EndPoints Products', () => {
    it('Create EndPoint Should Create product and return product', async () => {
      const res = await request
        .post('/api/v1/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'testProduct',
          description: 'lap lap lap',
          price: 120.5,
          category: 'iiii',
        } as Product);
      const { name, id } = res.body.product;
      expect(res.status).toBe(200);
      expect(name).toBe('testProduct');
      expect(id).toBe(1);
    });

    it('index EndPoint Should  return all products', async () => {
      const res = await request
        .get('/api/v1/products')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.products).toHaveSize(1);
    });
    it('show EndPoint Should  return product', async () => {
      const res = await request
        .get('/api/v1/products/1')
        .set('Authorization', `Bearer ${token}`);
      const { name, id } = res.body.product;
      expect(res.status).toBe(200);
      expect(name).toBe('testProduct');
      expect(id).toBe(1);
    });

    it('show EndPoint Should  update and return update product', async () => {
      const res = await request
        .patch('/api/v1/products')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
          name: 'testProduct2',
          description: 'lap lap lap22',
          price: 15500.55,
          category: 'iiiiiii',
          id: 1,
        } as Product);
      const { name, id, category } = res.body.product;
      expect(res.status).toBe(200);
      expect(name).toBe('testProduct2');
      expect(category).toBe('iiiiiii');
      expect(id).toBe(1);
    });

    it('delete EndPoint Should  return deleted product', async () => {
      const res = await request
        .delete('/api/v1/products/1')
        .set('Authorization', `Bearer ${token}`);
      const { name, id } = res.body.product;
      expect(res.status).toBe(200);
      expect(name).toBe('testProduct2');
      expect(id).toBe(1);
    });
  });
});
