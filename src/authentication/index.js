const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const { registerOrUpdateUser } = require('@services/RegistrationService')

const auth0 = app => {
  passport.use(
    new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}:${process.env.PORT}/callback`,
      },
      async (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, await registerOrUpdateUser(accessToken, profile))
      },
    ),
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  app.use(passport.initialize())
  app.use(passport.session())
}

module.exports = { auth0 }
