const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String
    },
    rating: {
        type: Number, min: 1, max: 5, default: 3
    },
    date: {
        type: Date,
        // this default sure doesn't do much, come back and fix
        default: function () {
            const date = new Date(+new Date())
            return date
        }
    },
    avatar: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewerName: {
        type: String
    }
  }, {
    timestamp: true
});

// Create your Restaurant Model
const restaurantSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    location: String,
    foodtype: {
        type: String,
        enum: ["Mexican", "Italian", "Greek", "Chinese", "Indian", "Japanese", "Soul", "American", "Thai", "Other"]
    },
    reviews: [reviewSchema]
   
}, {
    timestamp: true
})


module.exports = mongoose.model('Restaurant', restaurantSchema);