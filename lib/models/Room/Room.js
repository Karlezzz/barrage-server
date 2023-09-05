const { ClassRoom } = require('../ClassRoom/index')
class Room {
  constructor(options) {
    options = options || {}
    this.id = options.id
    this.name = options.name || 'Classroom'
    this.created = options.created || (new Date().valueOf())
    this.modified = options.modified || (new Date().valueOf())
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
