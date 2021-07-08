var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User = require('../models/user');
var CustomError = require('../errors/CustomError');

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token) 
    return next (new CustomError("No Token included for authorization"), 401);

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return next (new CustomError("Not Authorized"), 401); 

    // if everything is good, save to request for use in other routes
    
    User.findById(decoded.id, function(err, user){
      if(err) return next (new CustomError("Not Authorized"), 401);    
      if(!user) return next (new CustomError("Not Authorized"), 401);   
      req.userId = decoded.id;
      req.isAdmin = user.isAdmin;
      next();
    })
  });

}

module.exports = verifyToken;