const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()


const { ScoreSchema } = require('../lib/models/Score')
const { MongoDB } = require('../db/index')

const { instance } = ScoreSchema.getInstance()
const scoreModel = instance
let response

router.post('/', async (req, res, next) => {
  const { body } = req
  const { creator, classRoomId } = body
  try {
    await MongoDB.connect()
    const originScore = await scoreModel.findOne({
      $and: [
        { creator },
        { classRoomId }
      ]
    })
    if (originScore) {
      response = Response.init({
        data: [originScore]
      })
    } else {
      const newScore = await scoreModel.create(body)
      response = Response.init({
        data: [newScore]
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

module.exports = router
