var express = require('express')
var router = express.Router()

const { Response } = require('../lib/models')
const { MongoDB } = require('../db/index')
const { UserSchema } = require('../lib/models/User')
const { RoomSchema } = require('../lib/models/Room')
const { ClassRoomSchema } = require('../lib/models/ClassRoom')

const roomModel = RoomSchema.getInstance().instance
const userModel = UserSchema.getInstance().instance
const classRoomModel = ClassRoomSchema.getInstance().instance
let response

router.post('/', async (req, res, next) => {
  try {
    const { body, ip } = req
    const { user, roomCode, password, classRoomId } = body
    const { id } = user
    const ipAddress = ip.match(/\d+\.\d+\.\d+\.\d/)
    let _user
    await MongoDB.connect()
    const originRoom = await roomModel.findOne({ code: roomCode })
    const originClassRoom = await classRoomModel.findOne({ id: classRoomId })
    if (!originClassRoom || !originRoom) return
    const { password: originPassword } = originRoom
    if (originPassword && originPassword !== password) return
    const originUser = await userModel.findOne({
      $or: [{ id }, { ipAddress }]
    })
    if (originUser) {
      _user = await userModel.findOneAndReplace({ $or: [{ id }, { ipAddress }] }, {
        ...user,
        ipAddress: ipAddress[0]
      }, { returnDocument: 'after' })
    } else {
      _user = await userModel.create({
        ...user,
        ipAddress: ipAddress[0]
      })
    }
    const { members } = originClassRoom
    const hasMember = members.find(m => m === id)
    if (!hasMember) {
      const { id: newUserId } = _user
      members.push(newUserId)
      await classRoomModel.updateOne({ id: classRoomId }, { members })
    }
    response = Response.init({
      data: [_user]
    })
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

router.put('/:id', async (req, res, next) => {
  try {
    const { body } = req
    const { id } = body
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
