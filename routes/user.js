const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', UserController.createUser);

router.post('/login', UserController.userLogin);

router.get('/profile', checkAuth, UserController.getUser);

module.exports = router;
