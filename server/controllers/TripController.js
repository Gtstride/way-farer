import pool from '../config.js/config';
import { createTrip, getTrip } from '../config.js/sql';


class TripController {
  /**
     * Only the admin can create a trip
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof UserController
  */
  static async trip(req, res) {
    if (!req.user.is_admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized user',
      });
    }
    const {
      bus_id, origin, destination, trip_date, fare,
    } = req.body;
    const params = [
      bus_id,
      origin,
      destination,
      trip_date,
      fare,
      'active',
      new Date(),
    ];

    try {
      const { rows } = await pool.query(createTrip, params);

      return res.status(201).json({
        status: 'success',
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'An error occurred',
      });
    }
  }

  /**
     * Get a trip
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof TripController
  */
  static async getAllTrip(req, res) {
    try {
      const { rows } = await pool.query(getTrip);
      if (rows.length <= 0) {
        return res.status(404).json({
          status: 'error',
          error: 'No Trip found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'An error occurred',
      });
    }
  }


  /** *
   *
   */
  static async cancelTrip(req, res) {
    if (!req.user.is_admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized user',
      });
    }

    const cancelTrip = `UPDATE trip SET status = 'canceled' WHERE id = ${req.params.id} returning *`;
    try {
      const { rows } = await pool.query(cancelTrip);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'No trip with such id found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Trip cancelled successfully',
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'An error occurred: Please check details provided and try again.',
      });
    }
  }
}

export default TripController;
