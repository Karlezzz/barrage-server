const express = require('express')
const router = express.Router()
const { Response } = require('../lib/models')
const { RoomSchema } = require('../lib/models/Room')
const { UserSchema } = require('../lib/models/User')
const { MongoDB } = require('../db/index')

const roomModel = RoomSchema.getInstance().instance
const userModel = UserSchema.getInstance().instance
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
  const { room, user } = body
  const { id } = room
  const { id: userId, name: userName } = user

  try {
    await MongoDB.connect()
    const originUser = await userModel.findOne({ id: userId })
    if (originUser) {
      await userModel.findOneAndReplace({ id: userId }, user)
    } else {
      await userModel.create(user)
    }
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
