const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session : false }, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            const err = {};
            err.status = 401;
            if (info && info.message) {
                err.code = info.message;
            }

            return res.status(err.status).json(err); // send the error response to client
        }
        req.user = user;
        next();
    })(req, res, next);
};
