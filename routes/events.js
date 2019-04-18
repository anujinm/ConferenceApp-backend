const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const eventController = require('../controllers/events');
const db = require('../models');
const validationCheck = require('../middlewares/checkValidation');

router.post('/event', eventController.createEvent);
router.get('/event/:id', eventController.getEvent);
router.get('/attendees/:id', eventController.getAllAttendees);

module.exports = router;


// make sure model/migration are set up properly. Sequlize not creating table.
