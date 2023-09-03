var express = require('express')
const { Response } = require('../lib/models')
var router = express.Router()

router.get('/', function (req, res, next) {
  const response = Response.init({
    data: [{ socketUrl: 'ws://192.168.1.10:3001' }],
  })
  res.send(response)
})

module.exports = router
