const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');

const BCRYPT_ROUNDS = 10;
const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const MAX_HASH_LENGTH = 190;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateHash() {
    const hash = [];
    for (let i = 0; i < MAX_HASH_LENGTH; i++) {
        hash.push(CHARS[getRandomInt(CHARS.length)]);
    }
    return hash.join('');
}

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
            const user = await User.create(
                {
                    email: email,
                    password: hashedPassword,
                    level: 0,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    bio: req.body.bio,
                    profilePic: 'pictures\\user\\avatar.png',
                    schoolDistrict: req.body.schoolDistrict,
                    roleAtDistrict: req.body.roleAtDistrict,
                    social1: req.body.social1,
                    social2: req.body.social2,
                    social3: req.body.social3,
                    hash: generateHash(),
                });
            return done(null, {email: user.email, userId: user.id});
        } catch (e) {
            return done(e);
        }
    }
));

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({where: {email: email}});
            if (user) {
                const response = await bcrypt.compare(password, user.password);
                if (response) {
                    return done(null, {email: user.email, userId: user.id, level: user.level}, {message: 'Logged in Successfully'})
                }
                return done(null, false, {message: 'Password did not match'});
            }
            return done(null, false, {message: 'Email not found'});
        } catch (e) {
            return done(e);
        }
    }
));


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.CONF_JWT_KEY
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({where: {id: jwt_payload.userId, email: jwt_payload.email, level: jwt_payload.level}});
        if (user) {
            return done(null, {email: user.email, userId: user.id, level: user.level});
        }
        return done(null, false, {message: 'Invalid Token'});
    } catch (e) {
        console.log(e);
        return done(e);
    }
}));
