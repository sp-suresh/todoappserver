const statusCodes = {
  SERVER_ERROR: 500,
  CLIENT_ERROR: 400,
  UNAUTHORISED: 401,
  SUCCESS: 200,
  NOT_FOUND: 404
}

function serverError(res, ex){
  logger.error(`${statusCodes.SERVER_ERROR} - Exception, ${res.req.method} - ${res.req.originalUrl}`, ex)
  res.status(statusCodes.SERVER_ERROR).send({msg: 'Sorry, something went wrong!'})
}

function clientError(res, msg){
  logger.warn(`${statusCodes.CLIENT_ERROR} - Client error, ${res.req.method} - ${res.req.originalUrl}`, msg)
  res.status(statusCodes.CLIENT_ERROR).send({msg})
}

function unauthorised(res, msg){
  logger.warn(`${statusCodes.UNAUTHORISED} - Unauthorised, ${res.req.method} - ${res.req.originalUrl}`)
  res.status(statusCodes.UNAUTHORISED).send({msg})
}

function success(res, obj){
  logger.verbose(`${statusCodes.SUCCESS} - Success, ${res.req.method} - ${res.req.originalUrl}`)
  res.status(statusCodes.SUCCESS).send(obj)
}

function notFound(res, msg){
  logger.verbose(`${statusCodes.NOT_FOUND} - NotFound, ${res.req.method} - ${res.req.originalUrl}`)
  res.status(statusCodes.NOT_FOUND).send({msg})
}

module.exports = {
  serverError,
  clientError,
  unauthorised,
  success,
  notFound
}
