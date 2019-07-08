import express from 'express';
import db from '../controllers/users';
import bus from '../controllers/bus';
import trip from '../controllers/trip';
import booking from '../controllers/booking';

const router = express.Router();

// ROUTES FOR USERS
router.get('/users', db.getUsers);
router.get('/users/:id', db.getUserById);
router.post('/users', db.createUser);
router.put('/users/:id', db.updateUser);
router.delete('/users/:id', db.deleteUser);


// ROUTE FOR BUSES
router.get('/bus', bus.getBuses);
router.get('/bus/:id', bus.getBusById);


// ROUTES FOR TRIPS
router.get('/trip', trip.getAllTrips);
router.get('/trip/:id', trip.getTripById);
router.post('/trip', trip.createTrip);
router.delete('/trip/:id', trip.deleteTrip);

// ROUTES FOR BOOKING
router.get('/booking', booking.getAllBookings);
router.get('/booking/:id', booking.getBookingById);
router.post('/booking', booking.createBooking);
router.delete('/booking/:id', booking.deleteBooking);


export default router;
