var express = require('express')
var router = express.Router()

router.get('/url', function (req, res, next) {
  const data = {
    data: 'http://192.168.1.10:3001',
    total: 1,
    error: [],
  }
  res.send(data)
})

module.exports = router
