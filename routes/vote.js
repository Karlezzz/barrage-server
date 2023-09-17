const express = require('express')
const router = express.Router()
const { io } = require('../socket/index.js')
const { Response } = require('../lib/models')
const { VoteSchema } = require('../lib/models/Vote')
const { MongoDB } = require('../db/index')

const { instance } = VoteSchema.getInstance()
const voteModel = instance
let response

router.get('/', async (req, res, next) => {
  try {
    await MongoDB.connect()
    const voteList = await voteModel.find({})
    response = Response.init({
      data: voteList
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
  try {
    await MongoDB.connect()
    const newVote = await voteModel.create(body)
    response = Response.init({
      data: [newVote]
    })
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

router.put('/:id', async (req, res, next) => {
  const { body } = req
  const { id } = body
  try {
    await MongoDB.connect()
    const originVote = voteModel.findOne({ id })
    if (originVote) {
      const updateVote = voteModel.findOneAndReplace({ id }, handlerUpdateVote(body, originVote), { returnDocument: 'after' })
      response = Response.init({
        data: [updateVote]
      })
      io.sockets.emit('updateVote', updateVote)
    }
  } catch (error) {
    console.log(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)
})

function handlerUpdateVote(newVote, originVote) {
  const { option, user } = newVote
  const { voteOptions } = originVote
  const originOption = voteOptions.find(o => {
    return option.id === o.id
  })
  if (originOption) {
    const { selectMembersId } = originOption
    const hasUser = selectMembersId.find(m => {
      return m === user.id
    })
    if (hasUser) return voteFromMongo
    selectMembersId.push(user)
  }
  return originVote
}

module.exports = router
