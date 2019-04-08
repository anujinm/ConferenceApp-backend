//This is where the js API is written
const db = require('../models');
const Event = db.Event;

exports.createEvent = async (req, res, next) => {
    try {
        const new_event = {
            eventName: req.body.eventName,
            eventTopic: req.body.eventTopic,
            eventOrganizer: req.body.eventOrganizer,
            eventStartDate: req.body.eventStartDate,
            eventEndDate: req.body.eventEndDate,
            eventDescription: req.body.eventDescription,
            eventAgenda: req.body.eventAgenda,
            eventMap: req.body.eventMap,
            eventPicture: req.body.eventPicture,
            eventAdditionalPicture: req.body.eventAdditionalPicture,
        };
        await Event.create(new_event);
        return  res.status(200).json({message: 'Event created'});
    }  catch (e) {
        return res.status(500).json({message: 'Server error'});
    }
};


module.exports.getEvent = async (req, res, next) => {
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
