import { Pool } from 'pg';
// import bus from '../dummyDB/bus';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookingserver',
  password: 'godstime',
  port: 5432,
});

const getBuses = (_request, response) => {
  pool.query('SELECT * FROM bus ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getBusById = (request, response) => {
  const id = parseInt(request.params.id, 10);
  pool.query('SELECT * FROM bus WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


export default {
  getBuses,
  getBusById,
};
