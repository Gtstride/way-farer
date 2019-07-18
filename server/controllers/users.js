/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

import bcrypt from 'bcryptjs';
import { Pool } from 'pg';


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookingserver',
  password: 'godstime',
  port: 
  
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
          message: 'User added successfully',
          user: {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
          },
        },
      },
      );
  });
};

// UPDATE A USER
const updateUser = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const hash = bcrypt.hashSync(request.body.password, 10);

  pool.query(
    'UPDATE users SET "first_name" = $1, "email" = $3, "last_name" = $2 WHERE id = $4',
    [request.body.first_name, request.body.email, request.body.last_name, hash, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User with ID: ${results.id}  modified `);
    },
  );
};


// DELETE A USER
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${results.id}`);
  });
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
