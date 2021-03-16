const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: {
        type: Number, min: 1, max: 5, default: 3
    },
    date: {
        type: Date,
        default: function () {
            return new Date()
        }
    }
  });


// Create your Restaurant Model
const restaurantSchema = new Schema({
    name: String,
    location: String,
    foodtype: {
        type: String,
        enum: ["Mexican", "Italian", "Greek"]
        // "Chinese", "Indian", "Japanese", "Soul", "American"
    },
    reviews: [reviewSchema]
   
})


// def needs google id

module.exports = mongoose.model('Restaurant', restaurantSchema);