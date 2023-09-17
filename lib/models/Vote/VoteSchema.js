const mongoose = require('mongoose')
const { Schema } = mongoose

class VoteSchema {
  constructor(instance) {
    this.instance = instance
  }

  static getSchema() {
    const _VoteSchema = new Schema({
      id: { type: String },
      code: { type: String },
      question: { type: String },
      password: { type: Number },
      created: { type: Number },
      duration: { type: Number },
      endTime: { type: Number },
      voteOptions: [this.getVoteOptionSchema()]
    })
    return _VoteSchema
  }

  static getVoteOptionSchema() {
    const _optionSchema = new Schema({
      id: { type: String },
      optionValue: { type: String },
      selectMembersId: [{ type: String }]
    })
    return _optionSchema
  }

  static getInstance() {
    if (this.instance) return this.instance
    const _vote = mongoose.model('votes', this.getSchema())
    return this.instance = new VoteSchema(_vote)
  }
}

module.exports = {
  VoteSchema
}
