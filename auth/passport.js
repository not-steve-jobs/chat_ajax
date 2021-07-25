const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs')


module.exports = function (passport) {
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async function (email, password, done) {
        try {
            const user = await User.findOne({email});
            if (!user) {
                return done(null, false, {message: 'That user not found'});
            }
            if(!(bcrypt.compare(password,user.password))) {
                return done(null, false, {message: 'Password incorrect!'});
            }
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
