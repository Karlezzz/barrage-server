const mongoose = require('mongoose')
const { Schema } = mongoose

class CommentSchema {
  constructor(instance) {
    this.instance = instance
  }

  static getSchema() {
    const _CommentSchema = new Schema({
      id: { type: String },
      value: { type: String },
      created: { type: Number },
      creator: { type: String },
      classRoomId: { type: String },
    })
    return _CommentSchema
  }

  static getInstance() {
    if (this.instance) return this.instance
    const _score = mongoose.model('comments', this.getSchema())
    return this.instance = new VoteSchema(_score)
  }
}

module.exports = {
  CommentSchema
}
