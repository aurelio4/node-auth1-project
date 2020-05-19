module.exports = errorHandler

function errorHandler(error, req, res, next) {
  const status = error.status || 500
  const payload = {
    error: error.message
  }
  res.status(status).json(payload)
  next()
}