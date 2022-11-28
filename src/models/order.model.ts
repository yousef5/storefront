import Order from '../types/order.type';
import pool from '../databases';

class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'INSERT INTO orders(status, user_id) VALUES ($1,$2) RETURNING *';
      const result = await connection.query(sqlQuery, [o.status, o.user_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when create new Order: ${error}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'SELECT o.id ,o.user_id, o.status ,u.user_name AS username FROM orders AS o LEFT JOIN users AS u ON o.user_id = u.id GROUP BY o.id, u.user_name, o.status';
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`some problem when return all Orders : ${error}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *';
      const result = await connection.query(sqlQuery, [
        o.status,
        o.user_id,
        o.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when update  one order : ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'SELECT o.id ,o.user_id, o.status ,u.user_name AS userName FROM orders AS o LEFT JOIN users AS u ON o.user_id = u.id WHERE o.id=($1) GROUP BY o.id, u.user_name, o.status';
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when show one order ${id} : ${error}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const connection = await pool.connect();
      const sqlQuery = 'DELETE  FROM  orders WHERE id=($1) RETURNING *';
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when delete one order ${id} : ${error}`);
    }
  }
}

export default OrderStore;
