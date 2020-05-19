const HttpException = require('./HttpException')

const DEFAULT_MESSAGE = "Invalid credentials"

class InvalidCredentialsException extends HttpException {
  constructor(message = DEFAULT_MESSAGE) {
    super(400, message)
  }
}

module.exports = InvalidCredentialsException