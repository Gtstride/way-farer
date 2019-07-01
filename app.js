/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

// Setting up the express app
const app = express();

// PARSE INCOMING REQUEST DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET ALL USERS ENTRY
app.get('/api/v1/users', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'All user successfully retrieved',
    users: db,
  });
});


// ADD ENTRY EITHER BY FORM OR OTHER MEANS
app.post('/api/v1/users', (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      success: 'false',
      message: 'Incorrect login details',
    });
  } if (!req.body.password) {
    return res.status(400).send({
      success: 'false',
      message: 'Incorrect user details',
    });
  } if (!req.body.first_name) {
    return res.status(400).send({
      success: 'false',
      message: 'Name already exist',
    });
  } if (!req.body.last_name) {
    return res.status(400).send({
      success: 'false',
      message: 'Last name matches',
    });
  } if (!req.body.is_admin) {
    return res.status(400).send({
      success: 'false',
      message: 'Sorry, you are not an admin',
    });
  }

  const user = {
    id: db.length + 1,
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    is_admin: req.body.is_admin,
  };
  db.push(user);
  return res.status(201).send({
    success: 'true',
    message: 'user successfully added',
    user,
  });
});


// GET A SINGLE ENTRY WITH THE ID
app.get('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((user) => {
    if (user.id === id) {
      // console.log('user id:'.user.id);
      // console.log('id '.id);
      return res.status(200).send({
        success: 'true',
        message: 'User successfully retrieved',
        user,
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: 'user does not exist, please make sure your provided the correct details',
  });
});


// DELETE AN SINGLE ENTRY
app.delete('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((user, index) => {
    if (user.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
        status: 'successful',
        message: 'User successfully delete',
      });
    }
  });
  return res.status(404).send({
    status: 'error',
    error: `We are sorry, user ${id} could not be found, please make sure to enter the correct information time, try again`,
  });
});


// UPDATE AN ENTRY
app.put('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let userFound;
  let userIndex;

  db.map((user, index) => {
    if (user.id === id) {
      userFound = user;
      userIndex = index;
    }
  });
  if (!userFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Sorry!, user not found, make sure to enter the right informations',
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      success: 'false',
      message: 'email address is required',
    });
  } if (!req.body.password) {
    return res.status(400).send({
      success: 'false',
      message: 'password is requied',
    });
  }
  const updateEmail = {
    id: userFound.id,
    email: req.body.email || userFound.email,
  };
  db.splice(userIndex, 1, updateEmail);

  const updateUser = {
    id: userFound.id,
    password: req.body.password || userFound.password,
  };
  db.splice(userIndex, 1, updateUser);

  return res.status(201).send({
    status: 'success',
    message: 'User has been added successfully',
    updateUser,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
