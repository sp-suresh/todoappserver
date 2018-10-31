const {mongoDbClient, ObjectId} = require("nodemongoclient");
const todoDb = new mongoDbClient();

function isValidObjectIdStr(id){
  return id.match(/^[0-9a-fA-F]{24}$/)
}

module.exports = {
  todoDb,
  ObjectId,
  isValidObjectIdStr
};
