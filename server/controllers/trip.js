import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookingserver',
  password: 'godstime',
  port: 5432,
});


// GET ALL TRIP
const getAllTrips = (_request, response) => {
  pool.query('SELECT * FROM trip ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET TRIP BY ID
const getTripById = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('SELECT * FROM trip WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// CREATE TRIP
const createTrip = (request, response) => {
  const
    {
      busId,
      origin,
      destination,
      tripDate,
      fare,
      status,
    } = request.body;

  pool.query('INSERT INTO trip (bus_id, origin, destination, trip_date, fare, status) VALUES ($1, $2, $3, $4, $5, $6)', [busId, origin, destination, tripDate, fare, status], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Trip successfully created with ID: ${results.insertId}`);
  });
};


const deleteTrip = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM trip WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Trip with ID: ${results.id} deleted`);
  });
};

export default {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTrip,
};
