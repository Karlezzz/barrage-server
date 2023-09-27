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
  try {
    const { body, ip } = req
    const { room, user } = body
    const { id: roomId } = room
    const { id: userId, name: userName } = user
    const ipAddress = ip.match(/\d+\.\d+\.\d+\.\d/)
    await MongoDB.connect()
    const originUser = await userModel.findOne({ id: userId })
    if (originUser) {
      await userModel.findOneAndReplace({ id: userId }, {
        ...user,
        ipAddress: ipAddress[0]
      })
    } else {
      await userModel.create({
        ...user,
        ipAddress: ipAddress[0]
      })
    }
    const originRoom = await roomModel.findOne({ id: roomId })
    if (originRoom) {
      const updateRoom = await roomModel.findOneAndReplace({ id: roomId }, room, { returnDocument: 'after' })
      response = Response.init({
        data: [updateRoom]
      })
    } else {
      const newRoom = await roomModel.create(room)
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
