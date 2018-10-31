const express = require("express")
const router = express.Router()
const todo = require('./todoHandler')

router.post('/', todo.addNewTodo)
router.get('/', todo.getTodo)
router.get('/buckets', todo.getTodoBuckets)

module.exports = router
