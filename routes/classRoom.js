const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()

const { MongoDB } = require('../db/index')
const { ClassRoomSchema } = require('../lib/models/ClassRoom')
const classRoomModel = ClassRoomSchema.getInstance().instance

router.post('/', async (req, res, next) => {
  const { body } = req
  console.log(body);
  const { id, inOnClass } = body
  const _isOnClass = !inOnClass
  try {
    await MongoDB.connect()
    const originClassRoom = await classRoomModel.findOne({ id })
    if (originClassRoom) {
      const updatedClassRoom = await classRoomModel.findOneAndUpdate({ id }, { $set: { isOnClass: false } }, { returnDocument: 'after' })
      response = Response.init({
        data: [updatedClassRoom]
      })
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
