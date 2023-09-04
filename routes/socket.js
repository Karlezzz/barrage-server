var express = require('express')
const { Response } = require('../lib/models')
var router = express.Router()

router.get('/', function (req, res, next) {
  const response = Response.init({
    data: [{ socketUrl: 'ws://10.62.247.107:3001' }], //school
    // data: [{ socketUrl: 'ws://192.168.1.10:3001' }], //home
  })
  res.send(response)
})

module.exports = router
