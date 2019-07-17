import express from 'express';

import TripController from '../controllers/TripController';
import BookController from '../controllers/bookingController';
import TripValidator from '../middlewares/tripValidator';
import Authentication from '../middlewares/auth';


const { trip, getAllTrip, cancelTrip } = TripController;
const {
  bookTrip, getAllBookings, deleteBooking, changeSeat,
} = BookController;


const tripRouter = express.Router();

tripRouter.post('/trips', Authentication.verifyToken, TripValidator.tripValidator, trip);
tripRouter.get('/trips', Authentication.verifyToken, getAllTrip);
tripRouter.patch('/trips/:id', Authentication.verifyToken, cancelTrip);
tripRouter.post('/bookings', Authentication.verifyToken, bookTrip);
tripRouter.get('/bookings', Authentication.verifyToken, getAllBookings);
tripRouter.delete('/bookings/:id', Authentication.verifyToken, deleteBooking);
tripRouter.patch('/bookings/:id', Authentication.verifyToken, changeSeat);

export default tripRouter;
