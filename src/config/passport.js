const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Serialize/Deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? done(null, user) : done(null, false, { message: 'Incorrect password' });
    } catch (error) {
        done(error);
    }
}));

// Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { providerId: profile.id } });
        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.emails?.[0]?.value || null, // Handle missing email
                provider: 'google',
                providerId: profile.id,
            });
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

// Facebook OAuth
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { providerId: profile.id } });
        if (!user) {
            user = await User.create({
                name: `${profile.name.givenName} ${profile.name.familyName}`, // Store full name
                email: profile.emails?.[0]?.value || null, // Handle missing email
                provider: 'facebook',
                providerId: profile.id,
            });
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));
