const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../models/user');
const Room = require('../models/room');
const Card = require('../models/card');
const VerifyToken = require('../auth/VerifyToken');
const CustomError = require('../errors/CustomError');


router.use(bodyParser.urlencoded({ extended: true }));

function isMember(req, res, next) {
    Room.findById(req.params.id, (err, room) => {
        if(err) next ( new CustomError('Error on the server while finding the room.', 500));
        isaMember = room.members.find((member) => {
            return member == req.userId;
        });
        if(!isaMember) res.status(400).send("User is not a member of this room.");
        next();
    });
};

router.get("/:room", VerifyToken, isMember, (req, res, next) =>{
    Card.find({room: req.params.room}, (err, cards) => {
        if(err) next ( new CustomError('Error on the server while finding the cards.', 500));
        res.status(200).send(cards);
    });
});

router.get("/:id", VerifyToken, (req, res, next) =>{
    Card.findById(req.params.id, (err, card) => {
        if(err) next ( new CustomError('Error on the server while finding the card.', 500));
        res.status(200).send(card);
    });
});

router.post('/create/:room', VerifyToken, isMember, (req, res,next) => {
    Card.create({
        name: req.body.name,
        descreption: req.body.descreption,
        room: req.params.room
    }, function(err, card){
        if(err) next ( new CustomError('Error on the server while creating the card.', 500));
        res.status(200).send(card);
    });
});

router.post('/', (req, res, next) => {
    
});