import express from 'express';
import db from '../controllers/users';
import bus from '../controllers/bus';
import trip from '../controllers/trip';
import booking from '../controllers/booking';

const router = express.Router();

// ROUTES FOR USERS
router.get('/api/v1/users', db.getUsers);
router.get('/api/v1/users/:id', db.getUserById);
router.post('/api/v1/users', db.createUser);
router.put('/api/v1/users/:id', db.updateUser);
router.delete('/api/v1/users/:id', db.deleteUser);


// ROUTE FOR BUSES
router.get('/api/v1/bus', bus.getBuses);
router.get('/api/v1/bus/:id', bus.getBusById);


// ROUTES FOR TRIPS
router.get('/api/v1/trip', trip.getAllTrips);
router.get('/api/v1/trip/:id', trip.getTripById);
router.post('/api/v1/trip', trip.createTrip);
router.delete('/api/v1/trip/:id', trip.deleteTrip);

// ROUTES FOR BOOKING
router.get('/api/v1/booking', booking.getAllBookings);
router.get('/api/v1/booking/:id', booking.getBookingById);
router.post('/api/v1/booking', booking.createBooking);
router.delete('/api/v1/booking/:id', booking.deleteBooking);


export default router;
