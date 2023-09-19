const mongoose = require('mongoose')
const { Schema } = mongoose

class ScoreSchema {
  constructor(instance) {
    this.instance = instance
  }

  static getSchema() {
    const _ScoreSchema = new Schema({
      id: { type: String },
      value: { type: Number },
      created: { type: Number },
      creator: { type: String },
      classRoomId: { type: String },
    })
    return _ScoreSchema
  }

  static getInstance() {
    if (this.instance) return this.instance
    const _score = mongoose.model('scores', this.getSchema())
    return this.instance = new VoteSchema(_score)
  }
}

module.exports = {
  ScoreSchema
}
