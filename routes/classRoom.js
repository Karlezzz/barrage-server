const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()

const { MongoDB } = require('../db/index')
const { ClassRoomSchema } = require('../lib/models/ClassRoom')
const { RoomSchema } = require('../lib/models/Room')
const { io } = require('../socket/index')
const classRoomModel = ClassRoomSchema.getInstance().instance
const roomModel = RoomSchema.getInstance().instance

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { id, inOnClass, ownerRoomId } = body
    const _isOnClass = !inOnClass
    await MongoDB.connect()
    const originClassRoom = await classRoomModel.findOne({ id })
    const ownerRoom = await roomModel.findOne({ id: ownerRoomId })
    const { classRoomIds } = ownerRoom
    if (!classRoomIds.find(i => i === id)) {
      classRoomIds.push(id)
      await roomModel.updateOne({ id: ownerRoomId }, { classRoomIds })
    }
    if (originClassRoom) {
      const updatedClassRoom = await classRoomModel.findOneAndUpdate(
        { id },
        { $set: { isOnClass: false } },
        { returnDocument: 'after' }
      )
      response = Response.init({
        data: [updatedClassRoom],
      })
      io.sockets.emit('closeSocket')
    } else {
      const classRoom = {
        ...body,
        isOnClass: _isOnClass,
      }
      const newClassRoom = await classRoomModel.create(classRoom)
      response = Response.init({
        data: [newClassRoom],
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
    const { roomId } = query
    await MongoDB.connect()
    const classRoomList = await classRoomModel.find({ ownerRoomId: roomId })
    response = Response.init({
      data: classRoomList
    })
  } catch (error) {
    return Promise.reject(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

module.exports = router
