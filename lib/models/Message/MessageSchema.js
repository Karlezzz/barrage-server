const mongoose = require('mongoose')
const { Schema } = mongoose

class MessageSchema {
  constructor(instance) {
    this.instance = instance
  }

  static getSchema() {
    const _messageSchema = new Schema({
      content: { type: String },
      userId: { type: String },
      userName: { type: String, default: 'User' },
      created: { type: Number },
      type: { type: String }
    })
    return _messageSchema
  }

  static getInstance() {
    if (this.instance) return this.instance
    const _message = mongoose.model('messages', this.getSchema())
    return this.instance = new MessageSchema(_message)
  }

}

module.exports = {
  MessageSchema
}
