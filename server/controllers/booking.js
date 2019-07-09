import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookingserver',
  password: 'godstime',
  port: 5432,
});

const getAllBookings = (_request, response) => {
  pool.query('SELECT * FROM booking ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


// GET BOOKING BY ID
const getBookingById = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('SELECT * FROM booking WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// CREATE BOOKING
const createBooking = (request, response) => {
  const
    {
      // eslint-disable-next-line camelcase
      trip_id,
      userId,
      createdOn,
    } = request.body;

  // eslint-disable-next-line camelcase
  pool.query('INSERT INTO booking (tripId, userId, createOn) VALUES ($1, $2, $3)', [trip_id, userId, createdOn], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Seat Booking successfully created with ID: ${results.insertId}`);
  });
};


const deleteBooking = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM booking WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Booking with ID: ${results.id} deleted`);
  });
};

export default {
  getAllBookings,
  getBookingById,
  createBooking,
  deleteBooking,
};
