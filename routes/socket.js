var express = require('express')
const { Response } = require('../lib/models')
var router = express.Router()
const { ip, socketPort } = require('../lib/helper/getIpAndPort')

router.get('/', function (req, res, next) {
  const response = Response.init({
    data: [{ socketUrl: `ws://${ip}:${socketPort}` }]
  })
  res.send(response)
})

module.exports = router
