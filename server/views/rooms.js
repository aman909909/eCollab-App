const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../models/user');
const Room = require('../models/room');
const VerifyToken = require('../auth/VerifyToken');
const CustomError = require('../errors/CustomError');

const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/create', VerifyToken, async function(req, res, next){
    try{
        if(req.body.public == "true"){
            req.body.password = "public";
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        req.body.members = req.userId;
        Room.create({
            name: req.body.name,
            description: req.body.desc,
            password: hashedPassword,
            owners: req.userId,
            public: req.body.isPublic,
            members: req.body.members
        }, 
        function(err, room){
            if(err) return next (new CustomError("Error on server while creating room.", 500));
            return res.status(200).send(room);
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }

});

router.get('/public-trending', VerifyToken, async function(req, res, next){
    try{
    Room.find({public: true}).sort('-activity',).limit(5).exec( async function(err, rooms){
        if(err) return res.status(500).send({error: "Error on the server while finding the rooms."});
        return res.status(200).send(rooms);
    });
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});
router.get('/all-user-rooms', VerifyToken, async function(req, res, next){
    Room.find({members: req.userId}, null, {sort: {'_id': -1}}, async function(err, rooms){
        if(err) return res.status(500).send({error: "Error on the server while finding the rooms."});
        return res.status(200).send(rooms);
    });
});

router.get('/all-owner-rooms', VerifyToken, async function(req, res, next){
    Room.find({owners: req.userId}, null, {sort: {'_id': -1}}, async function(err, rooms){
        if(err) return res.status(500).send({error: "Error on the server while finding the rooms."});
        return res.status(200).send(rooms);
    });
});

router.get('/', VerifyToken, async function(req, res, next){
    if(!req.isAdmin) return res.status(500).send("You need to be a admin to perform this operation.");
    Room.find({}, function(err, rooms){
        if(err) return next (new CustomError("Error on server", 500));
        res.status(200).send(rooms);
    });
});

router.get('/:id', VerifyToken, async function(req, res, next){
    try{
        Room.findById(req.params.id, { password: 0 }, async function(err, room){
            if(err) return res.status(500).send({error: 'Error on server while finding the room, make sure link/ID is correct.'});
            if(!room) return res.status(404).send({error: 'No room found, make sure link/ID is correct.'});
            isMember = room.members.find((member) => {
                return member == req.userId;
            });
            //If room is public, push member if not already, then return without auth.
            room.activity = room.activity + 1;
            room.save().then(async response =>{
                if(room.public) {
                    if(!isMember) {
                        room.members.push(req.userId);
                        updatedRoom = await room.save();
                        res.status(200).send({allow: true, room: updatedRoom});
                    }
                }
                if(!isMember) return res.status(200).send({allow:false, room: "User is not a member of this room."});
                return res.status(200).send({allow: true, room: room});
            }). catch(err => {
                    return res.status(500).send({error: 'Error on server while updating the room.'});
            })

        });
    }
    catch(err){
        console.log(err);
    }

});

router.post('/auth/:id', VerifyToken, async function(req, res, next){
    Room.findById(req.params.id, async function(err, room){
        if(err) return res.status(500).send({error: "Error on the server while finding the room."});
        isMember = room.members.find((member) => {
            return member == req.userId;
        });
        if(isMember) return res.status(400).send({error: "User is already a memeber of this room."});
        if(room.public) req.body.password = "public";
        const passwordIsValid = bcrypt.compareSync(req.body.password, room.password);
        if(!passwordIsValid) return res.status(401).send({error: "Oops, Password is incorrect!"});

        room.members.push(req.userId);
        room.activity = room.activity + 1;
        room.save().then(resp => res.status(200).send(resp)).catch(err => console.log(err));

        return res.status(200).send(room);
    });
    
});



module.exports = router;