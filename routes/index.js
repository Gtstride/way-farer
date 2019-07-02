import express from 'express';
import db from '../db/db';
// import db from '../db/bus';
import UserController from '../usersControllers/users';
import BusController from '../busesController/buses';

const router = express.Router();

// GET ALL USERS ENTRY
router.get('/api/v1/users', UserController.getAllUsers);
router.get('/api/v1/users/:id', UserController.getAUser);
router.post('/api/v1/users', UserController.createUser);
router.put('/api/v1/users/:id', UserController.updateUser);
router.delete('/api/v1/users/:id', UserController.deleteUser);


router.get('/api/v1/buses', BusController.getAllBuses);
// router.get('/api/v1/buses/:id', BusController.getABus);
// router.post('/api/v1/buses', BusController.createBus);
// router.put('/api/v1/buses/:id', BusController.updateBus);
// router.delete('/api/v1/buses/:id', BusController.deleteBus);

export default router;
