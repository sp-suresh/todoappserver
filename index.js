global.logger = require('nodewinstonlogger')

logger.info(`Starting Todo API Server!`)

var {mongo, PORT} = require('./keys')
var {todoDb} = require('./lib/mongoDbClient')
var {notFound} = require('./middlewares/basicResHandler')
var bodyParser = require('./middlewares/bodyParser')
var express = require("express")
var router = express.Router()
var app = express()

todoDb.connect(mongo, () => {
  logger.info(`Connected to mongodb database: ${mongo.dbName}!`)
  
  router.use('/todo', require('./controllers/todo'))
  // Temp user login
  app.use(function(req, res, next){
    req.user = {idx: 1}
    next()
  })

  app.use(bodyParser)
  app.use('/api', router)
  app.use(function(req, res, next){
    notFound(res)
  });

  app.listen(PORT, (e) => {
    if(e){
      logger.error('Error starting application', e)
      process.exit()
    }
    else{
      logger.info(`Application started on port: ${PORT}`)
    }
  })
}, (err) => {
  logger.error(err)
  process.exit()
})
