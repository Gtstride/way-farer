/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

import db from '../db/bus';

class BusesController {
  getAllBuses(req, res) {
    return res.status(200).send({
      status: 'success',
      message: 'Buses retrieved successfully',
      buses: db,
    });
  }
}


const busController = new BusesController();
export default busController;
