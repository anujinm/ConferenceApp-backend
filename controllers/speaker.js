//This is where the js API is written

const db = require('../models'); //connects to practice speaker.js
const Speaker = db.Speaker;

exports.createSpeaker = async (req, res, next) => {
    const new_speaker = {
        speakerName: req.body.firstName,
        speakerTopic: req.body.speakerTopic,
        speakerPicture: req.body.speakerPicture,
        speakerBio: req.body.speakerBio,
        speakerSlides: req.body.speakerSlides
    };

    db.Speaker.create({
        new_speaker
    })

    .then(new_speaker => {
        console.log('success')
    });

    //return new_speaker;
};