const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const passport = require('passport');

exports.createUser = (req, res, next) => {
    passport.authenticate('signup', async (err, user, info) => {
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
    passport.authenticate('login', async (err, user, info) => {
        try {
            return general_login(err, user, info, req, res, next);
        } catch (e) {
            return next(e);
        }
    })(req, res, next);
};

exports.getUser = async (req, res, next) => {
    try {
        let userId = req.user.userId;

        const user = await User.findOne({
            where: {id: userId},
            attributes: ['email']
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


function general_login(err, user, info, req, res, next) {
    if (err || !user) {
        return res.status(404).json({message: info.message});
    }
    req.login(user, {session: false}, async (error) => {
        if (error) return next(error);
        const body = {userId: user.userId || user.id, email: user.email, level: user.level};
        const token = jwt.sign(
            body,
            process.env.CONF_JWT_KEY,
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
