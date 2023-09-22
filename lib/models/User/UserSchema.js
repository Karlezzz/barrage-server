const mongoose = require('mongoose')
const { Schema } = mongoose

class UserSchema {
  constructor(instance) {
    this.instance = instance
  }

  static getSchema() {
    const _UserSchema = new Schema({
      id: { type: String },
      name: { type: String },
      ipAddress: { type: String },
      created: { type: Number },
      modified: { type: Number },
    })
    return _UserSchema
  }

  static getInstance() {
    if (this.instance) return this.instance
    const _user = mongoose.model('users', this.getSchema())
    return this.instance = new UserSchema(_user)
  }
}

module.exports = {
  UserSchema
}
