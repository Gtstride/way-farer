// import { Pool } from 'pg';
import 'dotenv/config';

import { Pool } from 'pg';


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookingserver',
  password: process.env.PASSWORD,
  port: 5432,
});

export default pool;
