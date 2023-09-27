class Message {
  constructor(options) {
    options = options || {}
    this.content = options.content || ''
    this.userId = options.userId
    this.userName = options.userName
    this.created = options.created || (new Date().valueOf())
    this.type = options.type || 'chat'
  }

  static init(options = {}) {
    if (options instanceof Message) {
      return options
    }
    const instance = new Message(options)
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

  get isValid() {
    return !!this.user
  }

}

module.exports = { Message }
