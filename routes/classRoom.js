const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()

const { MongoDB } = require('../db/index')
const { ClassRoomSchema } = require('../lib/models/ClassRoom')
const classRoomModel = ClassRoomSchema.getInstance().instance

router.post('/', async (req, res, next) => {
  const { body } = req
  const _isOnClass = body.inOnClass
  try {
    await MongoDB.connect()
    const classRoom = {
      ...body,
      isOnClass: !_isOnClass
    }
    const newClassRoom = await classRoomModel.create(classRoom)
    response = Response.init({
      data: [newClassRoom]
    })
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

module.exports = router
