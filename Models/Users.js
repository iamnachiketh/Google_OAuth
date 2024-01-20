const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Username:String,
    googleID:String,
    tumbnail:String
});

const user = mongoose.model('users',userSchema);

module.exports = user;
