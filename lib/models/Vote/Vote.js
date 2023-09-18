const { nanoid } = require('nanoid')
const { VoteOption } = require('../VoteOption')
class Vote {
  constructor(options) {
    options = options || {}
    this.id = options.id || nanoid()
    this.created = options.created || (new Date().valueOf())
    this.duration = options.duration
    this.endTime = this.created + options.duration
    this.question = options.question
    this.voteOptions = VoteOption.initFromArray(options.voteOptions) || []
  }

  isInValidTime() {
    const now = new Date().valueOf()
    return now <= this.endTime ? true : false
  }

  get isValid() {
    return !!this.question
    && !!this.voteOptions
    && this.voteOptions.length >= 2
    && this.created
    && this.duration
  }

  static init(options = {}) {
    if (options instanceof Vote) {
      return options
    }
    const instance = new Vote(options)
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
  Vote
}
