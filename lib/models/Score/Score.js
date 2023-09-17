const { nanoid } = require("nanoid")
const { ClassRoom } = require("../ClassRoom")
const { User } = require("../User")

class Score {
  constructor(options) {
    options = options || {}
    this.id = options.id || nanoid()
    this.created = options.created || (new Date().valueOf())
    this.value = options.value
    this.creator = User.init(options.creator)
    this.classRoom = ClassRoom.init(options.classRoom)
  }

  get isValid() {
    // return !!this.id && !!this.creator && !!this.value && !!this.classRoom
    return !!this.id && !!this.creator && !!this.value
  }

  static init(options = {}) {
    if (options instanceof Score) {
      return options
    }
    const instance = new Score(options)
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
  Score
}
