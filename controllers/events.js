//This is where the js API is written
const db = require('../models');
const Event = db.Event;
const User = db.User;

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

exports.getAllAttendees = async (req, res, next) => {
    try {
        let eventId = '';
        if (req.params.id) {
            eventId = req.params.id;
            exclude = ['createdAt', 'updatedAt', 'hash', 'password'];
        }
        const attendees = await User.findAll({
            where: {eventId: eventId},
            attributes: {exclude}
        });
        if (attendees) {
            return res.status(200).json(attendees);
        } else {
            return res.status(404).json({
                message: 'Attendees not found'
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};

module.exports.getEvent = async (req, res, next) => {
    try {
        let eventId = '';
        if (req.params.id) {
            eventId = req.params.id;
        }
        const event = await Event.findOne({
            where: {id: eventId}
        });

        if (event) {
            return res.status(200).json({event});
        } else {
            return res.status(404).json({
                message: 'event not found',
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};
