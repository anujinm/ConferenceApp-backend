//This is where the js API is written
const db = require('../models');
const Event = db.Event;
const User = db.User;
const Speaker = db.Speaker;

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
            eventPicture: 'pictures\\event\\' + req.body.eventPicture,
            eventLocation: req.body.eventLocation,
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

module.exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.findAll({
        });

        if (events) {
            return res.status(200).json({events});
        } else {
            return res.status(404).json({
                message: 'events not found',
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

module.exports.updateEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({where: {id: eventId}});
        if (event) {
            const new_event = {
                eventName: req.body.eventName,
                eventTopic: req.body.eventTopic,
                eventOrganizer: req.body.eventOrganizer,
                eventStartDate: req.body.eventStartDate,
                eventEndDate: req.body.eventEndDate,
                eventDescription: req.body.eventDescription,
                eventLocation: req.body.eventLocation
            };
            const updated = await Event.update(new_event,{where: {id: eventId}});
            if (updated) {
                return res.status(200).json({
                    message: 'Event updated successfully'
                });
            } else {
                return res.status(400).json({
                    message: 'Event failed to update'
                })
            }
        }
    } catch(e) {
        return res.status(500).json({
            message: 'Server not available',
            error: JSON.stringify(e)
        })
    }
};
module.exports.updateEventMap = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({where: {id: eventId}});
        if (event) {
            const new_event = {
                eventMap: req.body.eventMap
            };
            const updated = await Event.update(new_event,{where: {id: eventId}});
            if (updated) {
                return res.status(200).json({
                    message: 'Event map updated successfully'
                });
            } else {
                return res.status(400).json({
                    message: 'Event map failed to update'
                })
            }
        }
    } catch(e) {
        return res.status(500).json({
            message: 'Server not available',
            error: JSON.stringify(e)
        })
    }
};
module.exports.updateEventAgenda = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({where: {id: eventId}});
        if (event) {
            const new_event = {
                eventAgenda: req.body.eventAgenda
            };
            const updated = await Event.update(new_event,{where: {id: eventId}});
            if (updated) {
                return res.status(200).json({
                    message: 'Event agenda updated successfully'
                });
            } else {
                return res.status(400).json({
                    message: 'Event agenda failed to update'
                })
            }
        }
    } catch(e) {
        return res.status(500).json({
            message: 'Server not available',
            error: JSON.stringify(e)
        })
    }
};
module.exports.uploadEventPicture = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const image = req.file;
        if (!image) {
            return res.status(422).json({message: 'Image not a valid'});
        }
        else {
            console.log(image, image.path);
        }
        const event = await Event.findOne({where: {id: eventId}});
        if (event) {
            const updated = await Event.update({eventPicture: image.path},{where: {id: eventId}});
            if (updated) {
                return res.status(200).json({
                    message: 'Event Picture updated successfully' + image + image.path
                });
            } else {
                return res.status(400).json({
                    message: 'Event Picture failed to update'
                })
            }
        }
    } catch(e) {
        return res.status(500).json({
            message: 'Server not available',
            error: JSON.stringify(e)
        })
    }
};

module.exports.deleteEvent  = async (req, res, next) => {
    try {
      const id = +req.params.id;
      let areSpeakersDeleted = false;
      let areUsersCleared = false;

      const speakerResult = await Speaker.destroy({
          where: {eventId: id}
      });
      if (speakerResult > 0) {
          console.log('Event deleted');
          areSpeakersDeleted = true;
      } else {
          console.log('Event not found');
          areSpeakersDeleted = true;
      }

      const userResult = await User.findAll({
          where: {eventId: id}
      });
      if (userResult) {
          const updated = await User.update({eventId: 0}, {where: {eventId: id}});
          if (updated) {
              console.log('users cleared')
          } else {
              console.log('users not found')
          }
      }


      if (areSpeakersDeleted) {
          const eventResult = await Event.destroy({where: {id: id}});
          if (eventResult > 0) {
              return res.status(200).json({message: 'Event deleted'});
          } else {
              return res.status(404).json({message: 'Event not found!'});
          }
      }
  } catch (e) {
        console.log(e);
      return res.status(500).json({message: 'Server error' + req.params.id});
  }
};
