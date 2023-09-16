const mongoose = require('mongoose')
const { Schema } = mongoose

class RoomSchema {
  static getSchema() {
    const _RoomSchema = new Schema({
      id: { type: String },
      code: { type: String },
      name: { type: String, default: 'Room' },
      password: { type: Number },
      created: { type: Number },
      modified: { type: Number },
      classRoomIds: [{ type: String }]
    })
    return _RoomSchema
  }
}

module.exports = {
  RoomSchema
}
