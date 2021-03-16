const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String
})


// def needs google id

module.exports = mongoose.model('User', userSchema);