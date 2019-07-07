/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
// import uuid from 'uuid';
// import Pool from 'pg';

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
  const
      {
        firstName,
        lastName,
        email,
        password,
      } = request.body;

  pool.query('INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3)', [firstName, lastName, email, password], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.insertId}`);
  });
};

// UPDATE A USER
const updateUser = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const
      {
        firstName,
        lastName,
        email,
        password,
      } = request.body;

  pool.query(
    'UPDATE users SET firstName = $1, email = $3, lastName = $2 WHERE id = $4',
    [firstName, email, lastName, password, id],
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
