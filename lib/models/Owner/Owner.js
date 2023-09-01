const { nanoid } = require('nanoid')
class Owner {
  constructor(options = {}) {
    options = options || {}
    this.name = options.name
    this.id = setId(options)
    this.ipAddress = options.ipAddress
    this.created = new Date().getTime()
    this.modified = this.created
  }

  static init(options = {}) {
    if (options instanceof Owner) {
      return options
    }
    const instance = new Owner(options)
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
    return !!this.name && !!this.id
  }
}

function setId(options) {
  const {id} = options
  return id ? id : nanoid()
}

module.exports = {
  Owner
}
