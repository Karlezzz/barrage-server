const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()
const { ScoreSchema } = require('../lib/models/Score')
const { MongoDB } = require('../db/index')
const { instance } = ScoreSchema.getInstance()
const scoreModel = instance
let response

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { creator, classRoomId } = body
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

router.get('/', async (req, res, next) => {
  try {
    const { query } = req
    const { classRoomId } = query
    await MongoDB.connect()
    const commentList = await scoreModel.find({ classRoomId })
    response = Response.init({
      data: commentList
    })
  } catch (error) {
    return Promise.reject(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

module.exports = router
