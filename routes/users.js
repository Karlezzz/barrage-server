var express = require('express')
var router = express.Router()

const { Response } = require('../lib/models')
const { io } = require('../socket/index')
const { MongoDB } = require('../db/index')

const { UserSchema } = require('../lib/models/User')
const { RoomSchema } = require('../lib/models/Room')
const { ClassRoomSchema } = require('../lib/models/ClassRoom')
const roomModel = RoomSchema.getInstance().instance
const userModel = UserSchema.getInstance().instance
const classRoomModel = ClassRoomSchema.getInstance().instance

let response



router.post('/', async (req, res, next) => {
  const { body } = req
  const { user, roomCode, password, classRoomId } = body
  const { id, ipAddress } = user
  try {
    await MongoDB.connect()
    const originRoom = await roomModel.findOne({ roomCode })
    const originUser = await userModel.findOne({
      $or: [{ id }, { ipAddress }]
    })
    const originClassRoom = await classRoomModel.findOne({ id: classRoomId })
    if (originRoom && originClassRoom) {
      const { password: originPassword } = originRoom
      if (originPassword && originPassword !== password) return
      const { members } = originClassRoom
      const hasMember = members.find(m => m === id)
      if (hasMember && originUser) {
        response = Response.init({
          data: [originUser]
        })
      } else {
        const newUser = await userModel.create(user)
        const { id: newUserId } = newUser
        members.push(newUserId)
        await classRoomModel.updateOne({ id: classRoomId }, { members })
        response = Response.init({
          data: [newUser]
        })
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  io.sockets.emit('userLogin', response)
  res.send(response)
})

router.put('/:id', async (req, res, next) => {
  const { body } = req
  const { id } = body
  try {
    await MongoDB.connect()
    const updatedUser = await userModel.findOneAndReplace({ id }, body, { returnDocument: 'after' })
    response = Response.init({
      data: [updatedUser]
    })
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})


module.exports = router;
