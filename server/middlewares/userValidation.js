/* eslint-disable consistent-return */
import Validator from 'validatorjs';
import pool from '../config.js/config';
import { queryUsersByEmail } from '../config.js/sql';


class UserValidator {
  static async signUpValidator(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      email, password, first_name, last_name,
    } = req.body;

    const rules = {
      email: 'required|email|min:10|max:30',
      first_name: 'required|min:2|max:20|alpha',
      last_name: 'required|min:2|max:20|alpha',
      password: 'required|min:6|max:16',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }

    email = email.toLowerCase().trim();
    try {
      const { rows } = await pool.query(queryUsersByEmail, [email]);
      if (rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Email already exists!',
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'An error occurred',
      });
    }

    req.body.email = email;
    req.body.first_name = first_name.toLowerCase().trim();
    req.body.last_name = last_name.toLowerCase().trim();
    req.body.password = password.trim();
    next();
  }

  /**
     * Login User to the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @param {function} next - Calls the next function/route handler
     * @returns {object} JSON representing the failure message.
     */
  static async signinValidator(req, res, next) {
    let { email, password } = req.body;
    if (email === undefined) {
      return res.status(400).json({
        status: 'Fail',
        error: 'Email cannot be undefined',
      });
    }
    if (typeof email !== 'string') {
      return res.status(400).json({
        status: 'Fail',
        error: 'Email should be a string',
      });
    }
    email = email.toLowerCase().trim();
    if (email === '') {
      return res.status(400).json({
        status: 'Fail',
        error: 'Please supply your email',
      });
    }
    pool.query(queryUsersByEmail, [email])
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(401).json({
            status: 'Fail',
            error: 'Authentication failed',
          });
        }
        if (password === undefined) {
          return res.status(401).json({
            status: 'Fail',
            error: 'Password cannot be undefined',
          });
        }
        if (typeof password !== 'string') {
          return res.status(400).json({
            status: 'Fail',
            error: 'Password should be a string',
          });
        }
        password = password.trim();
        if (password === '') {
          return res.status(401).json({
            status: 'Fail',
            error: 'Password cannot be empty',
          });
        }
        req.body.email = email;
        req.body.password = password;
        return next();
      })
      .catch(error => res.status(400).json({
        error: error.message,
      }));
  }
}
export default UserValidator;
