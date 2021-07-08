const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');

const User = require('../models/user');
const Room = require('../models/room');
const VerifyToken = require('../auth/VerifyToken');
const CustomError = require('../errors/CustomError');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post('/available', async (req, res, next) => {
    User.findOne({username: req.body.username}, async function(err, user){
        if(err) next ( new CustomError('Server Error', 500) );
        if(!user) return res.status(200).send({available: true});
        return res.status(200).send({available: false, user: user});
    })
});

router.get('/', VerifyToken, async function(req, res){
    if(!req.isAdmin) return res.status(500).send("You need to be a admin to perform this operation.");
    User.find({}, { password: 0 })
        .then(resp => res.send(resp))
        .catch(err => res.send(err));
});

router.get('/:id', VerifyToken, async function (req, res, next) {
    if(!req.isAdmin) return res.status(500).send("You need to be a admin to perform this operation.");
    User.findById(req.params.id, { password: 0 }, function(err, user){
        if(err) next ( new CustomError('Server Error', 500) );
        if(!user) next( new CustomError('User not found', 404) );
        return res.status(200).send(user);
    })

});


module.exports = router;