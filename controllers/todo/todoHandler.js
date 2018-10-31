var {serverError, clientError, success} = require('../../middlewares/basicResHandler')
var {todoDb, ObjectId, isValidObjectIdStr} = require('../../lib/mongoDbClient')
const validBucketId = [1, 2, 3]

async function addNewTodo(req, res){
  try{
    var body = req.body
    if(!Object.keys(req.body).length){
      return clientError(res, 'Please specify a valid req body')
    }

    var todoDoc = {
      uid: req.user.idx,
      desc: body.desc || "",
      title: body.title || "",
      bucketId: parseInt(body.bucketId)
    }
    
    if(typeof todoDoc.desc !== 'string' || !todoDoc.desc.length){
      return clientError(res, 'Please specify a valid todo description')
    }
    if(typeof todoDoc.title !== 'string' || !todoDoc.title.length){
      return clientError(res, 'Please specify a valid todo Title')
    }
    if(validBucketId.indexOf(todoDoc.bucketId) === -1){
      return clientError(res, 'Please specify a valid bucketId')
    }


    todoDoc.ets = Date.now()
    var insertedDoc = await todoDb.insertDocument('todos', todoDoc)
    if(insertedDoc.result.n === 1 && insertedDoc.result.ok === 1){
      success(res, {'msg': 'Todo added successfully'})
    }
    else{
      serverError(res, 'No todo record was inserted')
    }
  }
  catch(e){
    serverError(res, e)
  }
}

async function getTodo(req, res){
  try{
    var qs = req.query
    
    var lmt = parseInt(qs.lmt) || 10
    var off = parseInt(qs.off) || 0
    var bucketId = parseInt(qs.bucketId)
    var uid = req.user.idx

    if(typeof off != 'number' || typeof lmt != 'number' || isNaN(off) || isNaN(lmt)){
      return clientError(res, 'Please specify a valid query string parameters')
    }
    var query = [
      {$match: {uid: uid}},
      {
        $lookup: {
          from: 'todoBuckets',
          localField: 'bucketId',
          foreignField: 'idx',
          as: "bucket"
        },
      },
      {$unwind: '$bucket'},
      {
        $project:{
          uid : 1,
          title : 1,
          desc : 1,
          bucket: "$bucket.nm",
        }
      },
      {$limit: lmt},
      {$sort : {ets : 1}}
    ]
    if(validBucketId.indexOf(bucketId) > -1){
      query[0]['$match'].bucketId = bucketId
    }
    var ttc = await todoDb.getDocumentCountByQuery('todos', query)

    var todoList = await todoDb.findDocByAggregation('todos', query)

    success(res, {ttc, todoList})
  }
  catch(e){
    serverError(res, e)
  }
}

async function getTodoBuckets(req, res){
  try{
    success(res, await todoDb.findDocFieldsByFilter('todoBuckets', {}, {_id: 0}, 0, 0, {idx: 1}))
  }
  catch(e){
    serverError(res, e)
  }
}

module.exports = {
  addNewTodo,
  getTodo,
  getTodoBuckets
}
