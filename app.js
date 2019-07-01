/* eslint-disable no-console */
import express from 'express';
import db from './db/db';

// Setting up the express app
const app = express();

// Get all users
app.get('/api/v1/users', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'All user successfully retrieved',
    users: db,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
