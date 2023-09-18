const { nanoid } = require("nanoid")
const { ClassRoom } = require("../ClassRoom")
const { User } = require("../User")

class Comment {
  constructor(options) {
    options = options || {}
    this.id = options.id || nanoid()
    this.created = options.created || (new Date().valueOf())
    this.creator = User.init(options.creator)
    this.value = options.value
    // this.classRoom = ClassRoom.init(options.classRoom)
  }

  get isValid() {
    return !!this.id 
    && !!this.creator 
    && !!this.value 
    // && !!this.classRoom
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
