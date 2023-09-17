const express = require('express')
const { Response } = require('../lib/models')
const { RoomSchema } = require('../lib/models/Room')
const { mongoose } = require('mongoose')
const router = express.Router()

const { MongoDB } = require('../db/index')
const roomModel = mongoose.model('rooms', RoomSchema.getSchema())
let response

router.get('/', async (req, res, next) => {
  try {
    await MongoDB.connect()
    const roomList = await roomModel.find({})
    response = Response.init({
      data: roomList
    })
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})


router.post('/', async (req, res, next) => {
  const { body } = req
  const { id } = body

  try {
    await MongoDB.connect()
    const originRoom = await roomModel.findOne({ id })
    if (originRoom) {
      const updateRoom = await roomModel.findOneAndReplace({ id }, body, { returnDocument: 'after' })
      response = Response.init({
        data: [updateRoom]
      })
    } else {
      const newRoom = await roomModel.create(body)
      response = Response.init({
        data: [newRoom]
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
