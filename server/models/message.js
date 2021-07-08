const mongoose = require('mongoose');

const User = require('./user');
const Room = require('./room');

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    author: {
        type: String,
        required: true
    },
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
});
mongoose.model('Message', MessageSchema);

module.exports = mongoose.model('Message', MessageSchema);