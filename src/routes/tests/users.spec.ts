import supertest from 'supertest';
import app from '../..';
import User from '../../types/user.type';
import pool from '../../databases';
import UserStore from '../../models/user.model';

const userStore = new UserStore();
const request = supertest(app);
let token = '';

describe('User Test EndPoints', () => {
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
    await connection.query(sqlQuery);
    connection.release();
    await userStore.create(testUser);
  });
  afterAll(async () => {
    const connection = await pool.connect();
    const sqlQuery = `DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1`;
    await connection.query(sqlQuery);
    connection.release();
  });

  describe('Test Authentication with its EndPoint', () => {
    it('rigth authenticate -> get token', async () => {
      const res = await request
        .post('/api/v1/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'test4test',
        });
      const { id, user_name, email, token: getToken } = res.body.data;
      token = getToken;
      expect(user_name).toBe('test');
      expect(email).toBe('test@test.com');
      expect(id).toBe(1);
      expect(res.status).toBe(200);
    });

    it('wront authenticate => 401 as status code', async () => {
      const res = await request
        .post('/api/v1/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'wrongPass',
        });
      expect(res.status).toBe(401);
    });
  });

  describe('Test CRUD EndPoints', () => {
    it('Create EndPoint Should Create user and return user', async () => {
      const res = await request
        .post('/api/v1/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test2@test.com',
          user_name: 'test2',
          first_name: 'test2',
          last_name: 'test2',
          password: 'test4test',
        } as User);
      const { email, id } = res.body.user;
      expect(res.status).toBe(200);
      expect(email).toBe('test2@test.com');
      expect(id).toBe(2);
    });
    it('show EndPoint Should  return user', async () => {
      const res = await request
        .get('/api/v1/users/2')
        .set('Authorization', `Bearer ${token}`);
      const { email, id } = res.body.user;
      expect(res.status).toBe(200);
      expect(email).toBe('test2@test.com');
      expect(id).toBe(2);
    });
    it('show EndPoint Should  update and return update user', async () => {
      const res = await request
        .patch('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
          email: 'test3@test.com',
          user_name: 'test3',
          first_name: 'test3',
          last_name: 'test3',
          password: 'test4test',
          id: 2,
        });
      const { email, id, first_name } = res.body.user;
      expect(res.status).toBe(200);
      expect(email).toBe('test3@test.com');
      expect(first_name).toBe('test3');
      expect(id).toBe(2);
    });
    it('delete EndPoint Should  return deleted user', async () => {
      const res = await request
        .delete('/api/v1/users/2')
        .set('Authorization', `Bearer ${token}`);
      const { email, id } = res.body.user;
      expect(res.status).toBe(200);
      expect(email).toBe('test3@test.com');
      expect(id).toBe(2);
    });
  });
});
