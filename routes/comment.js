const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()

router.post('/', (req, res, next) => {
  const { body } = req
  console.log(body)
  const response = Response.init({
    data: [body]
  })
  //update sql
  res.send(response)
})

module.exports = router
