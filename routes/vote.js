const express = require('express')
const { Response } = require('../lib/models')
const router = express.Router()
const { io } = require('../socket/index.js')

router.post('/', (req, res, next) => {
  const { body } = req
  console.log(body)
  const response = Response.init({
    data: [body]
  })
  //update sql
  res.send(response)
})

router.put('/:id', (req, res, next) => {
  const { body } = req

  //update sql
  const updateVoteData = updateVote(body, voteFromMongo)
  const response = Response.init({
    data: [updateVoteData]
  })
  res.send(response)
  io.sockets.emit('updateVote', updateVoteData)
})

function updateVote(_vote, vv) {
  const { vote, option, user } = _vote
  const { voteOptions } = vv
  const originOption = voteOptions.find(o => {
    return option.id === o.id
  })
  if (originOption) {
    const { selectMembers } = originOption
    const hasUser = selectMembers.find(m => {
      return m.id === user.id
    })
    if (hasUser) return voteFromMongo
    selectMembers.push(user)
  }
  return vv
}

const voteFromMongo = {
  question: 'How to learn Vue?',
  id: '111',
  content: 'test',
  duration: 600000,
  created: 1694765644129,
  endTime: 1994765704129,
  voteOptions: [
    {
      id: 'A2HRJMCVVvUZEMSJqzQQl',
      optionValue: 'Online',
      selectMembers: [
        { name: 'Tom', id: '001' },
      ],
    },
    {
      id: 'A2HRJMCVVvUZEMSJqzQ23',
      optionValue: 'Book',
      selectMembers: [
        { name: 'Karle', id: '011' },
      ],
    },
    {
      id: 'A2HRJMCVVvUDUHFSJqzQ23',
      optionValue: 'Class',
      selectMembers: [
        { name: 'Joe', id: '005' },
      ],
    },
  ],
}



module.exports = router
