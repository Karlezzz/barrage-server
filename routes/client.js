const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()
const { ip } = require('../lib/helper/getIpAndPort')
let response

router.get('/', (req, res, next) => {
  try {
    const ipAddress = ip
    response = Response.init({
      data: [ipAddress]
    })

  } catch (error) {
    console.log(error);
  }
  res.send(response)
})

module.exports = router
