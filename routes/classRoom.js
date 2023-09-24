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
  const { body } = req
  const { id, inOnClass, ownerRoomCode } = body
  const _isOnClass = !inOnClass
  try {
    await MongoDB.connect()
    const originClassRoom = await classRoomModel.findOne({ id })
    const ownerRoom = await roomModel.findOne({ code: ownerRoomCode })
    const { classRoomIds } = ownerRoom
    if (!(classRoomIds.find(i => i === id))) {
      classRoomIds.push(id)
      await roomModel.updateOne({ code: ownerRoomCode }, { classRoomIds })
    }
    if (originClassRoom) {
      const updatedClassRoom = await classRoomModel.findOneAndUpdate({ id }, { $set: { isOnClass: false } }, { returnDocument: 'after' })
      response = Response.init({
        data: [updatedClassRoom]
      })
      io.sockets.emit('closeSocket')
    } else {
      const classRoom = {
        ...body,
        isOnClass: _isOnClass
      }
      const newClassRoom = await classRoomModel.create(classRoom)
      response = Response.init({
        data: [newClassRoom]
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
