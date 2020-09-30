const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const { upsertUser } = require('@db/models/user')

const facebookInit = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}:${process.env.PORT}/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'name', 'gender', 'picture.type(large)'],
      },
      async function(accessToken, refreshToken, profile, cb) {
        const userData = {
          familyName: profile.name.familyName,
          givenName: profile.name.givenName,
          providerId: profile.id,
          email: profile.emails !== undefined ? profile.emails[0].value : '',
          picture: profile.photos !== undefined? profile.photos[0].value : '',
          provider: 'facebook',
          token: accessToken,
        }

        const user = await upsertUser({ providerId: userData.providerId }, userData)
        return cb(null, user)
      },
    ),
  )
}

const googleInit = () => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}:${process.env.PORT}/auth/google/callback`,
      passReqToCallback: true,
    },
    async function(request, accessToken, refreshToken, profile, done) {
      const userData = {
        familyName: profile.family_name,
        givenName: profile.given_name,
        providerId: profile.id,
        email: profile.email,
        picture: profile.picture,
        provider: 'google',
        token: accessToken,
      }

      const user = await upsertUser({ providerId: userData.providerId }, userData)
      return done(null, user)
    },
  ))

}


module.exports = { facebookInit, googleInit }
