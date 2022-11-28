import ProductOrder from '../types/product-order.type';
import pool from '../databases';

class ProductOrderStore {
  async create(po: ProductOrder): Promise<ProductOrder> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'INSERT INTO products_orders(order_id, product_id , qty) VALUES ($1,$2 ,$3) RETURNING *';
      const result = await connection.query(sqlQuery, [
        po.order_id,
        po.product_id,
        po.qty,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when add new product in order: ${error}`);
    }
  }

  async index(orderId: number): Promise<ProductOrder[]> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'SELECT po.id,po.order_id,po.product_id,p.name AS product_name,p.description AS product_desc,p.price AS product_price , p.category AS product_catg ,po.Qty  FROM products_orders AS po LEFT JOIN products AS p ON po.product_id = p.id WHERE po.order_id=($1) GROUP BY po.id,po.order_id, po.product_id,po.qty,p.name,p.description,p.price,p.category';
      const result = await connection.query(sqlQuery, [orderId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `some problem when return all products in one order : ${error}`
      );
    }
  }

  async update(po: ProductOrder): Promise<ProductOrder> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'UPDATE products_orders SET order_id=$1, product_id=$2, qty=$3 WHERE id=$4 RETURNING *';
      const result = await connection.query(sqlQuery, [
        po.order_id,
        po.product_id,
        po.qty,
        po.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `some problem when update  one product in one order : ${error}`
      );
    }
  }

  async show(orderID: number, productID: number): Promise<ProductOrder> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'SELECT po.id,po.order_id,po.product_id,p.name AS product_name,p.description AS product_desc,p.price AS product_price , p.category AS product_catg ,po.Qty  FROM products_orders AS po LEFT JOIN products AS p ON po.product_id = p.id WHERE po.order_id=($1) AND po.product_id=($2) GROUP BY po.id,po.order_id, po.product_id,po.qty,p.name,p.description,p.price,p.category';
      const result = await connection.query(sqlQuery, [orderID, productID]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `some problem when show one product with id :  ${productID}  in order with id : ${orderID}: ${error}`
      );
    }
  }

  async delete(orderID: number, productID: number): Promise<ProductOrder> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE  FROM  products_orders WHERE order_id=($1) AND product_id=($2) RETURNING *';
      const result = await connection.query(sqlQuery, [orderID, productID]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `some problem when delete one product with id :  ${productID}  in order with id : ${orderID}: ${error}`
      );
    }
  }
}

export default ProductOrderStore;
