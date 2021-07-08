const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const VerifyToken = require('./VerifyToken');

const CustomError = require('../errors/CustomError');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require('../models/user');

/*
 * Configure JWT
 */
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const config = require('../config'); // get config file


//REGISTER
router.post('/register', async function(req, res, next) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.findOne({username: req.body.username}, function(err, user){
      if(err) return res.status(500).send({ error: "Internal Server Error"});
      if(user) return next (new CustomError("Username already in use!", 400));
    });

    User.create({
      name : req.body.name,
      username : req.body.username,
      password : hashedPassword,
      isAdmin: false
    }, 
    function (err, user) {
      if (err){
         return next (new CustomError(err, 500));
      }

      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });
      return res.status(200).send({ auth: true, token: token });
    });
  
});

//LOGIN
router.post('/login', async function(req, res, next) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) return res.status(500).send({ error: "Internal Server Error"});
      if (!user) return res.status(404).send({ error: `* No user found with username ${req.body.username}.`});

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ error: "* Password is incorrect."});
  
      // if user is found and password is valid
      // create a token
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      // return the information including token as JSON
      res.status(200).send({ auth: true, token: token });
    });
  
});

//GET USER WITH TOKEN
router.get('/me', VerifyToken, async function(req, res, next) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) next (new CustomError('There was an error on the server', 500));
      if (!user) next (new CustomError('User not found', 404));
      res.status(200).send(user);
    });
  
});

router.use((err, req, res, next) => {
  next(err);
})


module.exports = router;