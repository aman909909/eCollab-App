const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      default: "Mr. No Name"
    },
    username: {
      type : String,
      unique : [true, 'Username already in use'],
      dropDups: [true, 'Username already in use'], 
      required : [true, 'Username is required']
    },
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
    }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);