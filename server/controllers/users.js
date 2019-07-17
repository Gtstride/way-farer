import { hashSync, compareSync } from 'bcryptjs';
import pool from '../config.js/config';
import Authentication from '../middlewares/auth';
import { createUser, queryUsersByEmail } from '../config.js/sql';

class UserController {
  /**
     * Create user account on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof UserController
  */
  static async signup(req, res) {
    const {
      email, password, first_name, last_name,
    } = req.body;
    const params = [
      email,
      hashSync(password, 10),
      first_name,
      last_name,
    ];

    try {
      const { rows } = await pool.query(createUser, params);
      const authUser = rows[0];
      const token = Authentication.createToken(authUser);
      return res.status(201).json({
        status: 'sucess',
        data: { token },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
     * Login a user to the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success message
     * @memberof UserController
     */
  static async login(req, res) {
    try {
      const result = await pool.query(queryUsersByEmail, [req.body.email]);
      if (!result.rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'No user with such mail found',
        });
      }
      const comparePassword = compareSync(req.body.password, result.rows[0].password);

      if (!comparePassword) {
        return res.status(401).json({
          status: 'error',
          error: 'Incorrect Password',
        });
      }
      const {
        id, email, is_admin, first_name, last_name,
      } = result.rows[0];
      const token = Authentication.createToken(id, email, is_admin);
      return res.status(200).json({
        status: 'success',
        data: {
          token,
          first_name,
          is_admin,
          last_name,
          email,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'Fail',
        error: 'An error occurred',
      });
    }
  }
}

export default UserController;
