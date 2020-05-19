const HttpException = require('./HttpException')

const DEFAULT_MESSAGE = "Cannot fulfill request"

class ServerException extends HttpException {
  constructor(message = DEFAULT_MESSAGE) {
    super(500, message)
  }
}

module.exports = ServerException