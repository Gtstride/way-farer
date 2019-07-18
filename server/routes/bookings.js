import express from 'express';
import BookController from '../controllers/bookingController';
import Authentication from '../middlewares/auth';


const {
  bookTrip, getAllBookings, deleteBooking, changeSeat,
} = BookController;


const bookingRouter = express.Router();


bookingRouter.post('/bookings', Authentication.verifyToken, bookTrip);
bookingRouter.get('/bookings', Authentication.verifyToken, getAllBookings);
bookingRouter.delete('/bookings/:id', Authentication.verifyToken, deleteBooking);
bookingRouter.patch('/bookings/:id', Authentication.verifyToken, changeSeat);

export default bookingRouter;
