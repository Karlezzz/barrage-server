const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()

const { CommentSchema } = require('../lib/models/Comment')
const { MongoDB } = require('../db')
const { instance } = CommentSchema.getInstance()
const commentModel = instance
let response

router.post('/', async (req, res, next) => {
  const { body } = req
  const { creator, classRoomId } = body
  try {
    await MongoDB.connect()
    const originComment = await commentModel.findOne({
      $and: [
        { creator },
        { classRoomId }
      ]
    })
    if (originComment) {
      response = Response.init({
        data: [originComment]
      })
    } else {
      const newComment = await commentModel.create(body)
      response = Response.init({
        data: [newComment]
      })
    }
  } catch (error) {
    console.log(error);
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

module.exports = router
