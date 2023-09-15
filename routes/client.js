const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()
const { ip } = require('../lib/helper/getIpAndPort')

router.get('/', (req, res, next) => {
  const ipAddress = ip
  // const ipAddress = getIpAddress()
  const response = Response.init({
    data: [ipAddress]
  })
  res.send(response)
})

module.exports = router
