/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
// import uuid from 'uuid';

import bcrypt from 'bcryptjs';
import { Pool } from 'pg';


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookingserver',
  password: 'godstime',
  port: 5432,
});


// GET ALL USERS ROUTE
const getUsers = (_request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET A USER BY ID
const getUserById = (request, response) => {
  const id = parseInt(request.params.id, 10);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// CREATE NEW USER
const createUser = (request, response) => {
//   const body = firstname, lastname, email, password, isadmin,
  const hash = bcrypt.hashSync(request.body.password, 10);
  // create token for user with JWT here. 
  // eslint-disable-next-line no-unused-vars
  pool.query('INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)', [request.body.first_name, request.body.last_name, request.body.email, hash, false], (error, results) => {
    if (error) {
      // console.log(error);
      throw error;
    }
    response.status(201).send(
      {
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

  // const
  //     {
  //       first_name,
  //       last_name,
  //       email,
  //       password,
  //     } = request.body;

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
