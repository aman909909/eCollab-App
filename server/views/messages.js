const express = require('express');
const router = express.Router();
const http = require('http').Server(router);
const path = require('path');
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const Message = require('../models/message');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User = require('../models/user');
var Room = require('../models/room');
// router.use(express.static(path.join(__dirname, '..', 'client', 'build')));
router.use(express.json())

io.on('connection', (socket) => {
    console.log('New Connection');
    const roomId = socket.handshake.query.roomid;
    socket.join(roomId);
    //Check if the user belongs to this room.
    Message.find({room: roomId}).sort('-_id').exec(function(err, messages){
        socket.emit('init', messages);
    });

    socket.on('message', (msg) => {
        jwt.verify(msg.author, config.secret, function(err, decoded) {    
          if(err) console.log(err);        
          else{
              User.findById(decoded.id, function(err, user){
                const info = new Message({
                  message: msg.data,
                  author: user.name,
                  room: msg.room
                });
            
                info.save().then(res => {}).catch(err => console.log(err));
                io.sockets.to(roomId).emit('push', info);
              })
          }
        });

    });
    socket.on('disconnect', (data) =>{
      console.log("User Disconnected");
    })
    socket.on('error', function (err) {
      console.log(err);
    });
});
http.listen(8001);

module.exports = router;