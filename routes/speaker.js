const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const speakerController = require('../controllers/speaker');
const db = require('../models');
const validationCheck = require('../middlewares/checkValidation');

router.post('/speaker', speakerController.createSpeaker);
router.get('/speaker/:id', speakerController.getSpeaker);
router.get('/speakers/:id', speakerController.getAllSpeakers);
router.delete('/speaker/:id', speakerController.deleteSpeaker);
module.exports = router;


// make sure model/migration are set up properly. Sequlize not creating table.
