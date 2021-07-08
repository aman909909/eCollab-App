const mongoose = require('mongoose');

const User = require('./user');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    password: String,
    public: Boolean,
    owners:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    members:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    activity:{
        type: Number,
        default: 1
    },
    messages:[
        {
            type: String,
            name: String,
        }
    ]
});
mongoose.model('Room', RoomSchema);

module.exports = mongoose.model('Room', RoomSchema);