//This is where the js API is written
const db = require('../models');
const Speaker = db.Speaker;

exports.createSpeaker = async (req, res, next) => {
    try {
        const new_speaker = {
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
        // let userId = req.user.userId;
        // let exclude = ['createdAt', 'updatedAt', 'hash', 'password'];
        // if (req.params.id) {
        //     userId = req.params.id;
        //     exclude = ['createdAt', 'updatedAt', 'hash', 'password', 'phoneNumber'];
        // }
        const  id = req.params.id;
        const speaker = await Speaker.findOne({
            where: {id},
            include: [{
                model: Speaker,
                attributes: ['id', 'speakerName', 'speakerTopic', 'speakerBio', 'speakerPicture', 'speakerSlides']
            }]
        });
        if (speaker) {
            return res.status(200).json(speaker);
        } else {
            return res.status(404).json({
                message: 'Speaker not found'
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};
