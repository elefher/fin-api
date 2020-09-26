const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.json({ user: req.user })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
