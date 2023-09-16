const { ClassRoom } = require("../ClassRoom")
const { Message } = require("../Message")

class Connection {
  constructor(options) {
    options = options || {}
    this.classRoom = ClassRoom.init(options.classRoom)
    this.created = options.created || (new Date().valueOf())
    this.messages = Message.initFromArray(options.message) || []
  }

  static init(options = {}) {
    if (options instanceof Connection) {
      return options
    }
    const instance = new Connection(options)
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
  Connection
}
