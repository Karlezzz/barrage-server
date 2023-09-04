class Response {
  constructor(options) {
    options = options || {}
    this.data = options.data || []
    this.total = this.data.length
    this.code = options.code || 200
    this.message = options.message || 'success'
  }

  static init(options) {
    return new Response(options)
  }
}

module.exports = {
  Response
}
