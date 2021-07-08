const mongoose = require('mongoose');

const User = require('./models/user');

require('dotenv').config()
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const config = require('./config'); // get config file


const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, 
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, 
    useFindAndModify: false,
    useUnifiedTopology: true
  }

const dbConnection = () =>{

    mongoose.connect('mongodb://mongo', options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Database connection established')
        User.findOne({ username: process.env.ADMINUSERNAME }, function(err, user){
            if(err) return res.status(500).send('Error on the server.');
            if(!user){
                const hashedPassword = bcrypt.hashSync(process.env.ADMINPASSWORD, 8);
  
                User.create({
                  username : process.env.ADMINUSERNAME,
                  email : process.env.ADMINEMAIL,
                  password : hashedPassword,
                  isAdmin: true
                }, 
                function (err, user) {
                  if (err){
                    return res.status(500).send("There was a problem registering the admin`.");
                  }
                  console.log('Admin account created!')
                });
            }
        });
    });

}
module.exports = dbConnection;

