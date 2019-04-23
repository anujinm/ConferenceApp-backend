//This is where the js API is written
const db = require('../models');
const Speaker = db.Speaker;

exports.createSpeaker = async (req, res, next) => {
    try {
        const new_speaker = {
            eventId: req.body.eventId,
            speakerName: req.body.speakerName,
            speakerTopic: req.body.speakerTopic,
            speakerPicture: req.body.speakerPicture,
            speakerBio: req.body.speakerBio,
            speakerSlides: req.body.speakerSlides
        };
        await Speaker.create(new_speaker);
        return  res.status(200).json({message: 'Speaker created'});
    }  catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};


module.exports.getSpeaker = async (req, res, next) => {
    try {
        let speakerId = '';
        if (req.params.id) {
            speakerId = req.params.id;
        }
        const speaker = await Speaker.findOne({
            where: {id: speakerId}
        });

        if (speaker) {
            return res.status(200).json({speaker});
        } else {
            return res.status(404).json({
                message: 'speaker not found',
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};

module.exports.getAllSpeakers = async (req, res, next) => {
    try {
        let eventId = '';
        if (req.params.id) {
            eventId = req.params.id;
        }
        const speaker = await Speaker.findAll({
            where: {eventId: eventId}
        });

        if (speaker) {
            return res.status(200).json({speaker});
        } else {
            return res.status(404).json({
                message: 'speakers not found',
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};

module.exports.deleteSpeaker  = async (req, res, next) => {
    try {
        const id = +req.params.id;

        const result = await Speaker.destroy({
            where: {id}
        });
        console.log(result);
        if (result > 0) {
            return res.status(200).json({message: 'Speaker Deleted'});
        } else {
            return res.status(404).json({message: 'Speaker not found!'});
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Server error' + req.params.id});
    }
};
