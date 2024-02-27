const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String},
    email: { type: String },
    password: {type:String},

});

const Notification = mongoose.model('immunities', userSchema);

module.exports = Notification;
