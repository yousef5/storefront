import Product from '../types/product.type';
import pool from '../databases';

class ProductStore {
  async create(p: Product): Promise<Product> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'INSERT INTO products(name, description, price, category) VALUES ($1,$2,$3,$4) RETURNING *';
      const result = await connection.query(sqlQuery, [
        p.name,
        p.description,
        p.price,
        p.category,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when create new product: ${error}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const connection = await pool.connect();
      const sqlQuery = 'SELECT * FROM  products';
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`some problem when return all Products : ${error}`);
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const connection = await pool.connect();
      const sqlQuery =
        'UPDATE products SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *';
      const result = await connection.query(sqlQuery, [
        p.name,
        p.description,
        p.price,
        p.category,
        p.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when update  product : ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await pool.connect();
      const sqlQuery = 'SELECT * FROM  products WHERE id=($1)';
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when show one Product ${id} : ${error}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connection = await pool.connect();
      const sqlQuery = 'DELETE  FROM  products WHERE id=($1) RETURNING *';
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`some problem when delete one Product ${id} : ${error}`);
    }
  }
}

export default ProductStore;
