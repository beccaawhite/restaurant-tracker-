const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    email: String,
    googleId: String,
    reviews: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review'},
}, {
    timestamp: true
})



module.exports = mongoose.model('User', userSchema);