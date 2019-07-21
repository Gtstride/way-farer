/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
// import express from 'express';
// import db from '../dummyDB/db';
/*
import { Pool } from 'pg';

import User from '../controllers/users';


const router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bookingserver',
    password: 'godstime',
    port: 5432,
  });

router.get('/', (req, res) => {
    res.json({
        status: 'Good',
        Message: 'Added successfully',
    });
});

const validUser = (user) => {
    const validEmail = typeof user.email === 'string'
                              && user.email.trim() !== '';
    const validPassword = typeof user.password === 'string'
                              && user.password.trim() !== ''
                              && user.password.trim().length >= 8;
        return validEmail && validPassword;
};


router.post('/signup', (req, res, next) => {
    if (validUser(req.body)) {
       User
        .getUserByEmail(req.body.email)
        .then((user) => {
            console.log('user', pool);
         res.json({
         user,
        // status: 'Wooop!',
        data: 'You have been added seamlessly',
        });
    }); 
    } else {
        // Send eror 
        next(new Error('Invalid User'));
    }
});

module.exports = router;
*/
