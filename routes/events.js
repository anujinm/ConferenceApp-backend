const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const eventController = require('../controllers/events');
const db = require('../models');
const validationCheck = require('../middlewares/checkValidation');
const checkAuth = require('../middlewares/checkAuth');
const adminAuth = require('../middlewares/adminAuth');

router.post('/event', validationCheck, eventController.createEvent);
router.get('/event/:id', eventController.getEvent);
router.get('/events', eventController.getAllEvents);
router.get('/attendees/:id', eventController.getAllAttendees);
router.put('/event/:id', checkAuth, adminAuth, eventController.updateEvent);
router.put('/event/map/:id', checkAuth, adminAuth, eventController.updateEventMap);
router.put('/event/agenda/:id', checkAuth, adminAuth, eventController.updateEventAgenda);
router.put('/event/eventPic/:id', checkAuth, adminAuth, eventController.uploadEventPicture);
router.delete('/event/:id',checkAuth, adminAuth, eventController.deleteEvent);
module.exports = router;


// make sure model/migration are set up properly. Sequlize not creating table.
