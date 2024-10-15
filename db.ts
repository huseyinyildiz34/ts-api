import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api1x',
  password: 'huseyin123',
  port: 5432,
});

export default pool;
