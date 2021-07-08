const mongoose = require('mongoose');

const User = require('./user');
const Room = require('./room');

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descreption: String,
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
});
mongoose.model('Card', CardSchema);

module.exports = mongoose.model('Card', CardSchema);