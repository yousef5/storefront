import { Pool } from 'pg';
import vars from '../vars';

const pool = new Pool({
  host: vars.host,
  database: vars.database,
  user: vars.user,
  password: vars.password,
  port: parseInt(vars.dbPort as string, 10),
});

export default pool;
