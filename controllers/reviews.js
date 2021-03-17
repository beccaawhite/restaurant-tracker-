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
        console.log(restaurant, "1")
        // console.log(reviews._id, "2")
        const reviewDoc = restaurant.reviews.id(req.params.id);
      
      // if(!reviewDoc.userId.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`);
      reviewDoc.remove();
      restaurant.save(function(err) {
        res.redirect(`/restaurants/${restaurant._id}`)
      })
    })
  }

// parent.children.id(_id).remove();
// parent.child.remove();
// parent.save(function (err) {
//   if (err) return handleError(err);
//   console.log('the subdocs were removed');
// });

// Restaurant.reviews.id(_id).remove();
//     Restaurant.reviews.remove();
//     Restaurant.save(function(err) {
//         res.redirect(`/restaurants/${restaurant._id}`)
//     })