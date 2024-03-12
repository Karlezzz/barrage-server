const mongoose = require('mongoose')
const { Schema } = mongoose

class ClassRoomSchema {
  constructor(instance) {
    this.instance = instance
  }

  static getSchema() {
    const _ClassRoomSchema = new Schema({
      id: { type: String },
      name: { type: String },
      beginTime: { type: Number },
      endTime: { type: Number },
      ownerRoomId: { type: String },
      isOnClass: { type: Boolean },
      members: [{ type: String }]
    })
    return _ClassRoomSchema
  }

  static getInstance() {
    if (this.instance) return this.instance
    const _classRoom = mongoose.model('classRooms', this.getSchema())
    return this.instance = new ClassRoomSchema(_classRoom)
  }
}

module.exports = {
  ClassRoomSchema
}
