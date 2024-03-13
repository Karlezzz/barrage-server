const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()
const { MongoDB } = require('../db/index')
const { ScoreSchema } = require('../lib/models/Score')
const { CommentSchema } = require('../lib/models/Comment')
const { ClassRoomSchema } = require('../lib/models/ClassRoom')
const { UserSchema } = require('../lib/models/User')

const scoreModel = ScoreSchema.getInstance().instance
const commentModel = CommentSchema.getInstance().instance
const userModel = UserSchema.getInstance().instance
let response

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { creator, classRoomId, value } = body
    await MongoDB.connect()
    // const originScore = await scoreModel.findOne({
    //   $and: [{ creator }, { classRoomId }],
    // })
    // if (originScore) {
    //   response = Response.init({
    //     data: [originScore],
    //   })
    // } else {
    //   const newScore = await scoreModel.create(body)
    //   response = Response.init({
    //     data: [newScore],
    //   })
    // }
    const originScore = await scoreModel.findOne({ $and: [{ creator }, { classRoomId }] })
    if (originScore) {
      const sum = Math.ceil((originScore.value + value) / 2)
      const newScore = await scoreModel.findOneAndUpdate({ $and: [{ creator }, { classRoomId }] }, { $set: { value: sum } }, { returnDocument: 'after' })
      response = Response.init({
        data: [newScore],
      })
    } else {
      const newScore = await scoreModel.create(body)
      response = Response.init({
        data: [newScore],
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
    const { classRoomId } = query
    await MongoDB.connect()
    const scoreList = await scoreModel.find({ classRoomId })
    const commentList = await commentModel.find({ classRoomId })
    let res = null
    if (scoreList.length !== 0 && commentList.length !== 0) {
      res = await Promise.all(scoreList
        .map(score => {
          const findComment = commentList.find(
            comment => comment.creator === score.creator
          )
          if (findComment) return { score, comment: findComment }
          else return score
        })
        .concat(
          commentList.filter(
            comment => !scoreList.find(score => score.creator === comment.creator)
          )
        ).map(async item => {
          const user = await userModel.findOne({ id: item.score.creator })
          return Promise.resolve({ ...item, user })
        }))
    } else if (scoreList.length === 0 && commentList.length !== 0) {
      // const arr = [...scoreList, ...commentList]
      // res = await Promise.all(arr.map(async item => {
      //   const user = await userModel.findOne({ id: item?.score?.creator || item?.comment?.creator })
      //   return Promise.resolve({ ...item, user })
      // }))
      const arr = commentList.map(comment => {
        return { comment, score: null }
      })
      res = await Promise.all(arr.map(async item => {
        const user = await userModel.findOne({ id: item?.comment?.creator })
        return Promise.resolve({ ...item, user })
      }))
    } else if (scoreList.length !== 0 && commentList.length === 0) {
      const arr = scoreList.map(score => {
        return { comment: null, score }
      })
      res = await Promise.all(arr.map(async item => {
        const user = await userModel.findOne({ id: item?.score?.creator })
        return Promise.resolve({ ...item, user })
      }))
    }
    else res = []

    response = Response.init({
      data: res,
    })
  } catch (error) {
    return Promise.reject(error)
  } finally {
    MongoDB.disconnect()
  }
  res.send(response)

})

module.exports = router
