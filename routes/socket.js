var express = require('express')
const { Response } = require('../lib/models')
var router = express.Router()
const { ip, port } = require('../lib/helper/getIpAndPort')

router.get('/', function (req, res, next) {
  const response = Response.init({
    data: [{ socketUrl: `ws://${ip}:${Number(port) + 1}` }], //school
    // data: [{ socketUrl: 'ws://192.168.1.10:3001' }], //home
  })
  res.send(response)
})

module.exports = router
