const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy

const facebookInit = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser(function (user, done) {
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL: `${process.env.APP_URL}/auth/facebook/callback`,
            },
            function (accessToken, refreshToken, profile, cb) {
                // User.findOrCreate(..., function(err, user) {
                //     if (err) { return cb(err); }
                //     cb(null, user);
                // });
                console.log("PROFILE", profile);

                return cb(null, profile)
            }
        )
    )

}

module.exports = {facebookInit}
