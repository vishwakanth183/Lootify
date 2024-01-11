var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
const passport = require('passport')
const User = require('../models/user.model.js')
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = User.findOne({ id: jwt_payload })
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }

    } catch (err) {
        return done(err, false);
    }
}))