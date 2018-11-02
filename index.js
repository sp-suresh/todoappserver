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
  function tempUserLogin(req, res, next){
    req.user = {idx: 1}
    next()
  }

  function allowCors(req, res, next){
    res.header("Access-Control-Allow-Origin", req.header('Origin'))
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST")
    res.header('Access-Control-Allow-Credentials', true)
    return next()
  }

  app.use(bodyParser)
  app.use('/api', allowCors, tempUserLogin, router)
  app.use(function(req, res, next){
    notFound(res)
  })

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
