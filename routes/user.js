const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const UserController = require('../controllers/user');
const db = require('../models');
const User = db.User;
const validationCheck = require('../middlewares/checkValidation');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                return User.findOne({where: {email: value}}).then(userData => {
                    if (userData) {
                        return Promise.reject('E-mail has been taken.');
                    }
                    return true;
                })
            })
            .normalizeEmail(),
        body('password', 'Please enter a password with minimum length of 3')
            .trim()
            .isLength({min: 3})
    ],
    validationCheck,
    UserController.createUser
);

router.post('/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .normalizeEmail()
        ,
        body('password', 'Please enter a password with minimum length of 3')
            .trim()
            .isLength({min: 3})
    ],
    validationCheck,
    UserController.userLogin
);

router.put('/profile', checkAuth, UserController.updateProfile);
router.put('/profilePic', checkAuth, UserController.updateProfilePic);
router.get('/profile/:id', checkAuth, UserController.getUser);
router.get('/profile', checkAuth, UserController.getUser);
router.put('/profile/event', checkAuth, UserController.unregisterFromEvent);
module.exports = router;
