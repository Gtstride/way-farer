/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import db from '../db/db';

class UsersController {
  getAllUsers(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Users retrieved successfully',
      users: db,
    });
  }

  getAUser(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((user) => {
      if (user.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'User retrieved successfully',
          user,
        });
    }
    });
    return res.status(404).send({
        success: 'true',
        message: 'user does not exist',
    });
  }

  createUser(req, res) {
    if (!req.body.email) {
      return res.status(400).send({
        success: 'false',
        message: 'email is required',
      });
    } if (!req.body.password) {
      return res.status(400).send({
        success: 'false',
        message: 'password is required',
      });
    }
    const user = {
      id: db.length + 1,
      email: req.body.email,
      password: req.body.password,
    };
    db.push(user);
    return res.status(201).send({
      success: 'true',
      message: 'User added successfully',
      user,
    });
  }

  updateUser(req, res) {
    const id = parseInt(req.params.id, 10);
    let userFound;
    let userIndex;
    // eslint-disable-next-line array-callback-return
    db.map((user, index) => {
      if (user.id === id) {
        userFound = user;
        userIndex = index;
      }
    });

    if (!userFound) {
      return res.status(404).send({
        success: 'false',
        message: 'user not found',
      });
    }

    if (!req.body.email) {
      return res.status(400).send({
        success: 'false',
        message: 'email is required',
      });
    } if (!req.body.password) {
      return res.status(400).send({
        success: 'false',
        message: 'Password is incorrect, please make sure you typed in the correct words, No caps!',
      });
    }

    const newUser = {
      id: userFound.id,
      email: req.body.email || userFound.email,
      password: req.body.password || userFound.password,
    };

    db.splice(userIndex, 1, newUser);

    return res.status(201).send({
      success: 'true',
      message: 'User added successfully',
      newUser,
    });
  }

  deleteUser(req, res) {
    const id = parseInt(req.params.id, 10);
    let userFound;
    let userIndex;
    // eslint-disable-next-line array-callback-return
    db.map((user, index) => {
      if (user.id === id) {
        userFound = user;
        userIndex = index;
      }
    });

    if (!userFound) {
      return res.status(404).send({
        success: 'false',
        message: 'User not found',
      });
    }
    db.splice(userIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'User deleted successfuly',
    });
  }
}

const userController = new UsersController();
export default userController;
