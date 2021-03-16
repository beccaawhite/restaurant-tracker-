const Restaurant = require("../models/restaurant")

module.exports = {
    create,
    delete: deleteReview
};

function create(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        restaurant.reviews.push(req.body);
        console.log(req.body, " THIS IS REQ.BODY")
        restaurant.save(function(err){
            res.redirect(`restaurants/${restaurant._id}`)
        })
    })
}

function deleteReview(req, res){
    console.log("DELETE  REVIEW  FUNCTION")
    // Restaurant(req.body, function(err, restaurant){
    //     console.log(req.body.reviews, "REST>REVIEWS HERE")
        // restaurant.reviews.deleteOne(req.body);
        // res.redirect(`/restaurants/${restaurant._id}`)
    // })
    // Restaurant.reviews.deleteOne(req.params.id)

}