const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const { upsertUser } = require('@db/models/user')

const facebookInit = app => {
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
        callbackURL: `${process.env.APP_URL}:${process.env.PORT}/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'name'],
      },
      async function (accessToken, refreshToken, profile, cb) {
        const fbUser = {
          familyName: profile.name.familyName,
          givenName: profile.name.givenName,
          facebookId: profile.id,
          email: profile.emails !== undefined ? profile.emails[0].value : '',
          provider: 'facebook',
          token: accessToken,
        }

        const user = await upsertUser({ facebookId: fbUser.facebookId }, fbUser)
        return cb(null, user)
      },
    ),
  )
}

module.exports = { facebookInit }
