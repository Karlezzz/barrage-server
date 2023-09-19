const { nanoid } = require("nanoid")

class Score {
  constructor(options) {
    options = options || {}
    this.id = options.id || nanoid()
    this.created = options.created || (new Date().valueOf())
    this.value = options.value
    this.creator = options.creator
    this.classRoomId = options.classRoomId
  }

  get isValid() {
    return !!this.id
      && !!this.creator
      && !!this.value
      && !!this.classRoomId
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
