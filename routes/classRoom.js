const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()

router.post('/', (req, res, next) => {
  const { body } = req
  const _isOnClass = body.isOnClass
  console.log(body)
  const response = Response.init({
    data: [{
      ...body,
      isOnClass:!_isOnClass
    }]
  })
  //update sql
  res.send(response)
})

module.exports = router
