const { nanoid } = require("nanoid")

class Comment {
  constructor(options) {
    options = options || {}
    this.id = options.id || nanoid()
    this.created = options.created || (new Date().valueOf())
    this.creator = options.creator
    this.value = options.value
    this.classRoomId = options.classRoomId
  }

  get isValid() {
    return !!this.id 
    && !!this.creator 
    && !!this.value 
    && !!this.classRoomId
  }

  static init(options = {}) {
    if (options instanceof Comment) {
      return options
    }
    const instance = new Comment(options)
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
  Comment
}
