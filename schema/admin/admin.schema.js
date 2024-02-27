const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
});

const Admin = mongoose.model('hairs', userSchema);

module.exports = Admin;
