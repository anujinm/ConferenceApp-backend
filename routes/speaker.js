const express = require('express');
const router = express.Router();
const speakerController = require('../controllers/speaker');

router.post('/speaker', speakerController.createSpeaker);

module.exports = router;


// make sure model/migration are set up properly. Sequlize not creating table.