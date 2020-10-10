const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', function (req, res) {
  res.json({ user: req.user })
})

router.get('/logout', function (req, res) {
  req.logOut()
  res.redirect('/')
})

router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
)

router.get(
  '/callback',
  passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
)

module.exports = router
