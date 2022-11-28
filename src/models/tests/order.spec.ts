// import pool from '../../databases';
import pool from '../../databases';
import Order from '../../types/order.type';
import OrderStore from '../order.model';
import UserStore from '../user.model';
import User from '../../types/user.type';
const userStore = new UserStore();
const orderStore = new OrderStore();

describe('Test Orders ===> Model ', () => {
  describe('Test The Methods in orderStore are exist', () => {
    it('should have create method', () => {
      expect(orderStore.index).toBeDefined();
    });
    it('should have show Method', () => {
      expect(orderStore.show).toBeDefined();
    });
    it('should have index Method', () => {
      expect(orderStore.index).toBeDefined();
    });
    it('should have edit Method', () => {
      expect(orderStore.update).toBeDefined();
    });
    it('should have delete Method', () => {
      expect(orderStore.delete).toBeDefined();
    });
  });

  describe('TEST Order Store Logic', () => {
    const newUser = {
      email: 'johnDoe@test.com',
      user_name: 'testuser',
      first_name: 'john',
      last_name: 'doe',
      password: 'secretPass',
    } as User;
    const newOrder = {
      status: 'active',
      user_id: 1,
    } as Order;
    afterAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sqlQuery);
      connection.release();
    });
    beforeAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
      await connection.query(sqlQuery);
      await userStore.create(newUser);
      connection.release();
    });
    it('Create Method : return creates Order', async () => {
      const createdOrder = await orderStore.create(newOrder);
      createdOrder.user_id = parseInt(
        createdOrder.user_id as unknown as string
      );
      expect(createdOrder).toEqual({
        id: 1,
        status: 'active',
        user_id: 1,
      } as Order);
    });
    it('Index Method  : get all Orders in order table with index Methods', async () => {
      const orders = await orderStore.index();
      expect(orders).toHaveSize(1);
      expect(orders[0].id).toBe(1);
      expect(orders[0].username).toBe('testuser');
    });
    it('Show Method  : get one order when use show Methods', async () => {
      const order = await orderStore.show(1);
      order.user_id = parseInt(order.user_id as unknown as string, 10);
      expect(order).toEqual({
        id: 1,
        status: 'active',
        user_id: 1,
        username: 'testuser',
      } as Order);
    });
    it('Show Method  : return undefined  when use  id not in database in show Method', async () => {
      const order = await orderStore.show(2);
      expect(order).toBeUndefined();
    });
    it('Update Method : retrun updated order', async () => {
      const order = await orderStore.update({
        status: 'complete',
        user_id: 1,
        id: 1,
      });
      order.user_id = parseInt(order.user_id as unknown as string, 10);
      expect(order).toEqual({
        id: 1,
        status: 'complete',
        user_id: 1,
      } as Order);
    });
    it('Delete Method : get deleted order when use right id', async () => {
      const order = await orderStore.delete(1);
      order.user_id = parseInt(order.user_id as unknown as string, 10);
      expect(order).toEqual({
        id: 1,
        status: 'complete',
        user_id: 1,
      } as Order);
    });
  });
});
