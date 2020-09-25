const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ user: req.user })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
