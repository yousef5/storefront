import User from '../types/user.type';
import hashPass from '../utils/hashPass';
import comparePass from '../utils/comparePass';
import pool from '../databases';

class UserStore {
  async create(u: User): Promise<User> {
    try {
      //? connect to db
      const connection = await pool.connect();

      //? query sentance
      const sqlQuery =
        'INSERT INTO users (email,user_name,first_name,last_name,password) values ($1,$2,$3,$4,$5) RETURNING id, email,user_name,first_name,last_name';

      //? use open connection with sql to get result
      const result = await connection.query(sqlQuery, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPass(u.password as string),
      ]);

      //? release db connection
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `There is a Problem when create User With userName : ${u.user_name} : ${error}`
      );
    }
  }
  async index(): Promise<User[]> {
    try {
      //? connect to db
      const connection = await pool.connect();

      //? query sentance
      const sqlQuery = 'SELECT * FROM users';

      //? use open connection with sql to get result
      const result = await connection.query(sqlQuery);

      //? release db connection
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`There is a Problem when get all Users  : ${error}`);
    }
  }
  async update(u: User): Promise<User> {
    try {
      //? connect to db
      const connection = await pool.connect();

      //? query sentance
      const sqlQuery =
        'update users SET email=$1, user_name=$2,first_name=$3,last_name=$4,password=$5 WHERE id=($6) RETURNING id, email,user_name,first_name,last_name';

      //? use open connection with sql to get result
      const result = await connection.query(sqlQuery, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPass(u.password as string),
        u.id,
      ]);

      //? release db connection
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `There is a Problem when update User With userName : ${u.user_name} : ${error}`
      );
    }
  }
  async show(id: number): Promise<User> {
    try {
      //? connect to db
      const connection = await pool.connect();

      //? query sentance
      const sqlQuery =
        'SELECT  id, email,user_name,first_name,last_name FROM users WHERE id=($1)';

      //? use open connection with sql to get result
      const result = await connection.query(sqlQuery, [id as number]);

      //? release db connection
      connection.release();
      return result?.rows[0] || {};
    } catch (error) {
      throw new Error(`There is a Problem show one user with id :${id}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      //? connect to db
      const connection = await pool.connect();

      //? query sentance
      const sqlQuery =
        'DELETE  FROM users WHERE id=($1) RETURNING id, email,user_name,first_name,last_name';

      //? use open connection with sql to get result
      const result = await connection.query(sqlQuery, [id]);

      //? release db connection
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`There is a Problem delete one user with id :${id}`);
    }
  }
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      //? connect to db
      const connection = await pool.connect();

      //? query sentance
      const sqlQuery = 'SELECT password FROM users WHERE email=($1)';

      //? use open connection with sql to get result
      const result = await connection.query(sqlQuery, [email]);

      //! check result length is true
      if (result.rows.length) {
        const userPassHash = result.rows[0].password;
        const isValidPass = comparePass(password, userPassHash);
        if (isValidPass) {
          const wantedUser = await connection.query(
            'SELECT id, email,user_name,first_name,last_name FROM users WHERE email=($1) ',
            [email]
          );
          return wantedUser.rows[0];
        }
      }
      //? release db connection
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Problem with login : ${error}`);
    }
  }
}

export default UserStore;
