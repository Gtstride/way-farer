/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import express from 'express';

const router = express.Router();

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
    if (validUser(req.param)) {
         res.json({
        status: 'Wooop!',
        data: 'You have been added seamlessly',
    }); 
    } else {
        // Send eror 
        next(new Error('Invalid User'));
    }
});

module.exports = router;
