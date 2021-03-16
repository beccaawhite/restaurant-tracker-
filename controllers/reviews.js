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


function deleteReview(req, res) {
    console.log("Delete is firing")


    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurant) {
      const reviewDoc = restaurant.reviews.id(req.params.id);

      console.log(reviewDoc)
      
      if(!reviewDoc.userId.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`);
      reviewDoc.remove();
      restaurant.save(function(err) {
        res.redirect(`/restaurants/${restaurant._id}`)
      })
    })
  }