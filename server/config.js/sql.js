const createUser = 'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) returning *';
// export const findUserById = 'SELECT * FROM users WHERE id = $1';
const queryUsersByEmail = 'SELECT * FROM users WHERE email = $1';


// Creating Trip Elements
const createTrip = 'INSERT INTO trip (bus_id, origin, destination, trip_date, fare, status, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
const getTrip = 'SELECT * FROM trip';
// GROUP QUERY


const bookTripQuery = `INSERT INTO 
booking (user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      returning id, user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email`;

const getAtripQuery = 'SELECT * FROM trip WHERE id = $1';

const getAllBookingsAdminQuery = 'SELECT * FROM booking';
const getAllBookingsUserQuery = 'SELECT * FROM booking WHERE email = $1';

const findAuserQuery = 'SELECT * FROM users WHERE id = $1';
const findAbusQuery = 'SELECT * FROM bus WHERE id = $1';
const checkBookingsQuery = 'SELECT * FROM booking WHERE (trip_id = $1 and seat_number = $2)';

const checkIfBookingExistQuery = 'SELECT * FROM booking WHERE (trip_id = $1 and user_id = $2)';

const deleteBookingQuery = 'DELETE FROM booking WHERE (id = $1 and user_id = $2) returning *';

const updateBookingQuery = 'UPDATE booking SET seat_number = $1 WHERE (email = $2 AND user_id = $3 AND booking_id = $4) returning *';

export {
  bookTripQuery,
  getAtripQuery,
  getAllBookingsAdminQuery,
  getAllBookingsUserQuery,
  findAuserQuery,
  findAbusQuery,
  checkBookingsQuery,
  checkIfBookingExistQuery,
  deleteBookingQuery,
  updateBookingQuery,
  createUser, queryUsersByEmail, createTrip, getTrip,
};
