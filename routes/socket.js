var express = require('express')
const { Response } = require('../lib/models')
var router = express.Router()
const { ip, socketPort } = require('../lib/helper/getIpAndPort')

let response
router.get('/', function (req, res, next) {
  try {
    response = Response.init({
      data: [{ socketUrl: `ws://${ip}:${socketPort}` }]
    })
  } catch (error) {
    console.log(error);
  }
  res.send(response)
})

module.exports = router
