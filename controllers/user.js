const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const path = require('path');
const passport = require('passport');
const BCRYPT_ROUNDS = 10;
const bcrypt = require('bcryptjs');

exports.createUser = (req, res, next) => {
    passport.authenticate('signup', { session : false },async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(404).json({message: info.message});
            }
            return res.status(201).json({
                message: 'User created!',
            });
        } catch (e) {
            next(e);
        }
    })(req, res, next);
};

exports.userLogin = (req, res, next) => {
    passport.authenticate('login',{ session : false }, async (err, user, info) => {
        try {
            return general_login(err, user, info, req, res, next);
        } catch (e) {
            return next(e);
        }
    })(req, res, next);
};
exports.updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await User.findOne({where: {id: userId}});
        if (user) {
            const new_user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                personalEmail: req.body.personalEmail,
                social1: req.body.social1,
                social2: req.body.social2,
                schoolDistrict: req.body.schoolDistrict,
                roleAtDistrict: req.body.roleAtDistrict,
                bio: req.body.bio,
                eventId: req.body.eventId,
            };
            const updated = await User.update(new_user, {where: {id: req.user.userId}});
            if (updated) {
                return res.status(200).json({
                    message: 'User updated successfully'
                });
            } else {
                return res.status(400).json({
                    message: 'User failed to update'
                })
            }
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch(e) {
        return res.status(500).json({
            message: 'Server not available',
            error: JSON.stringify(e)
        })
    }
};

exports.getUser = async (req, res, next) => {
    try {
        let userId = req.user.userId;
        let exclude = ['createdAt', 'updatedAt', 'hash', 'password'];
        if (req.params.id) {
            userId = req.params.id;
            exclude = ['createdAt', 'updatedAt', 'hash', 'password', 'phoneNumber'];
        }
        const user = await User.findOne({
            where: {id: userId},
            attributes: {exclude}
        });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const currentPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const user = await User.findOne({where: {id: userId}});
        if (user) {
            const response = await bcrypt.compare(currentPassword, user.password);

            if (response) {
                const newHashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
                await user.update({password: newHashedPassword});
                return res.status(200).json({message: 'Password updated!'})
            }
            return res.status(200).json({message: 'Password did not match'});
        }
        return res.status(200).json({message: 'User not found'});
    } catch (e) {
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};

exports.updateProfilePic = async (req, res, next) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(422).json({message: 'Image not valid'});
        }
        const currentFolder = __dirname.split(path.sep).pop();
        const imagePath = image.path.substring(__dirname.length - currentFolder.length);

        const updated = await User.update({profilePic: imagePath}, {where: {id: req.user.userId}});
        if (updated) {
            return res.status(200).json({message: 'Profile pic updated successfully', profilePic: imagePath});
        }
        return res.status(400).json({message: 'Profile pic was not updated'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Server not available',
        })
    }
};

exports.registerForEvent = async (req, res, next) => {
  try {
      const userId = req.user.userId;
      const eventId = req.params.id;
      const user = await User.findOne({where: {id: userId}});
      if (user) {
          const updated = await User.update({eventId: eventId}, {where: {id: req.user.userId}});
          if (updated) {
              return res.status(200).json({
                  message: 'User successfully registered'
              });
          } else {
              return res.status(400).json({
                  message: 'User failed to register'
              })
          }
      }
  } catch (e) {
      return res.status(500).json({
          message: 'Server not available',
          error: JSON.stringify(e)
      })
  }
};

exports.unregisterFromEvent = async (req, res, next) => {
  try {
      const userId = req.user.userId;
      const user = await User.findOne({where: {id: userId}});
      if (user) {
          const updated = await User.update({eventId: 0}, {where: {id: req.user.userId}});
          if (updated) {
              return res.status(200).json({
                  message: 'User successfully unregistered'
              });
          } else {
              return res.status(400).json({
                  message: 'User failed to unregister'
              })
          }
      }
  } catch (e) {
      return res.status(500).json({
          message: 'Server not available',
          error: JSON.stringify(e)
      })
  }
};

exports.unregisterAllFromEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const users = await User.findAll({where: {eventId: eventId}});
        if (users) {
            const updated = await User.update({eventId: 0}, {where: {eventId: eventId}});
            if (updated) {
                return res.status(200).json({
                    message: 'All Users successfully unregistered'
                });
            } else {
                return res.status(400).json({
                    message: 'Users failed to unregister'
                })
            }
        }
    } catch (e) {
        return res.status(500).json({
            message: 'Server not available',
            error: JSON.stringify(e)
        })
    }
};

function general_login(err, user, info, req, res, next) {
    if (err || !user) {
        return res.status(404).json({message: info.message});
    }
    req.login(user, {session: false}, async (error) => {
        if (error) return next(error);
        const body = {userId: user.userId || user.id, email: user.email, level: user.level};
        const token = jwt.sign(
            body,
            "S7UYTBT8s5FCRZyUpiKh",
            { expiresIn: '10d' }
        );
        return res.status(200).json({
            token: token,
            expiresIn: 3600*24*10,
            level: user.level,
            userId: user.userId || user.id
        });
    })
}

