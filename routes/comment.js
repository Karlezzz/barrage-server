const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()

const { CommentSchema } = require('../lib/models/Comment')
const { MongoDB } = require('../db')
const { instance } = CommentSchema.getInstance()
const commentModel = instance
let response

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { creator, classRoomId } = body
    await MongoDB.connect()
    const originComment = await commentModel.find({
      $and: [
        { creator },
        { classRoomId }
      ]
    })
    if (originComment.length <= 3) {
      const newComment = await commentModel.create(body)
      response = Response.init({
        data: [newComment]
      })
    } else {
      // const newComment = await commentModel.create(body)
      // response = Response.init({
      //   data: [newComment]
      // })
      response = Response.init({
        data: originComment
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
