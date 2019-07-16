import pool from '../config.js/config';
import { createTrip, getTrip } from '../config.js/sql';


class TripController {
  /**
     * Create user account on the application
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
        error: 'unauthorized user',
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
        status: 'sucess',
        data: rows[0],
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
        error: 'unauthorized user',
      });
    }

    const cancelTrip = `UPDATE trip SET status = 'canceled' WHERE id = ${req.params.id} returning *`;
    try {
      const { rows } = await pool.query(cancelTrip);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'No trip found',
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
        error: 'An error occurred',
      });
    }
  }
}

export default TripController;
