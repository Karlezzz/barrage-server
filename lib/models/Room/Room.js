const { nanoid } = require('nanoid')
const { ClassRoom } = require('../ClassRoom/index')
class Room {
  constructor(options) {
    options = options || {}
    this.id = options.id || nanoid()
    this.code = parseInt(options.code) || 10000
    this.name = options.name || 'Classroom'
    this.password = options.password
    this.created = options.created || (new Date().valueOf())
    this.modified = options.modified || (new Date().valueOf())
    // this.owner = options.owner
    this.classRoomIds = options.classRoomIds || []
    this.classRoom = ClassRoom.initFromArray(options.classRoom) || []
  }

  get isValid() {
    return !!this.id
  }

  static init(options = {}) {
    if (options instanceof Room) {
      return options
    }
    const instance = new Room(options)
    return instance.isValid ? instance : null
  }

  static initFromArray(arr = []) {
    if (Array.isArray(arr)) {
      return arr.map(this.init)
    }
    return []
  }

  static initOnlyValidFromArray(arr = []) {
    return this.initFromArray(arr).filter((i) => i)
  }
}

module.exports = {
  Room
}
