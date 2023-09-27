const mongoose = require('mongoose')
const { Schema } = mongoose

class RoomSchema {
  constructor(instance) {
    this.instance = instance
  }

  static getSchema() {
    const _RoomSchema = new Schema({
      id: { type: String },
      code: { type: String },
      name: { type: String, default: 'Room' },
      password: { type: String },
      created: { type: Number },
      modified: { type: Number },
      classRoomIds: [{ type: String }]
    })
    return _RoomSchema
  }

  static getInstance() {
    if(this.instance) return this.instance
    const _room = mongoose.model('rooms', this.getSchema())
    return this.instance = new RoomSchema(_room)
  }

}

module.exports = {
  RoomSchema
}
 