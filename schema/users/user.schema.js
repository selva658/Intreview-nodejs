const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: {type:String},

});

const User = mongoose.model('livercares', userSchema);

module.exports = User;
