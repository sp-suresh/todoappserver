var {serverError} = require('./basicResHandler');

function bodyParser(req, res, next) {
  if(req.method === "GET") {
    next();
    return;
  }
  var data = "";
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", function() {
    try {
      if(data){
        req.body = JSON.parse(data);
      }
    }
    catch(ex) {
      return serverError(res, ex);
    }
    return next();
  });
}

module.exports = bodyParser;
