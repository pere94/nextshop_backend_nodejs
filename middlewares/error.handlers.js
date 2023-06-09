function logErrors (err, req, res, next) {
  next(err)
}

//se deben poner los 4 parametros aunque no se usen para que se detecte que es un middleware de tio error
function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler (err, req, res, next) {
  if(err.isBoom) {
    const {output} = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
