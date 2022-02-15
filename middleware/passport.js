const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"802074641050-ia5ctihvfdlh68gmurfhgpd282udfta9.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:4000/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));