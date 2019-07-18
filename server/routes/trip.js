import express from 'express';

import TripController from '../controllers/TripController';
import TripValidator from '../middlewares/tripValidator';
import Authentication from '../middlewares/auth';


const { trip, getAllTrip, cancelTrip } = TripController;


const tripRouter = express.Router();

tripRouter.post('/trips', Authentication.verifyToken, TripValidator.tripValidator, trip);
tripRouter.get('/trips', Authentication.verifyToken, getAllTrip);
tripRouter.patch('/trips/:id', Authentication.verifyToken, cancelTrip);

export default tripRouter;
