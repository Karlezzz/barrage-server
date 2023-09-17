class ClassRoom {
  constructor(options) {
    options = options || {}
    this.name = options.name || 'class'
    this.id = options.id
    this.beginTime = options.beginTime || (new Date().valueOf())
    this.endTime = options.endTime
    this.ownerRoomCode = options.ownerRoomCode
    this.members = options.members || []
    this.isOnClass = options.isOnClass || false
    // this.creator = options.creator
  }

  get isValid() {
    return !!this.id
    && !!this.ownerRoomCode 
    // && !!this.creator 
  }

  static init(options = {}) {
    if (options instanceof ClassRoom) {
      return options
    }
    const instance = new ClassRoom(options)
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
  ClassRoom
}
