const Restaurant = require("../models/restaurant")

module.exports = {
    create,
    delete: deleteReview,
    update
};

function create(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
      console.log("userID", req.body, req.user)
      req.body.userId = req.user._id;
      req.body.reviewerName = req.user.name;
      // get the avatar picture
      req.body.avatar = req.user.avatar

      restaurant.reviews.push(req.body);
      // restaurant.reviews.userId = req.user._id
        
      // restaurant.reviews.userId = req.user._id;
      restaurant.save(function(err){
          res.redirect(`/restaurants/${restaurant._id}`)
      })
    })
}

// deletes specific reviews
function deleteReview(req, res) {
    console.log("Delete is firing")

    Restaurant.findById(req.params.id1, function(err, restaurant) {
      
      const reviewSubDoc = restaurant.reviews.id(req.params.id2);
  
      reviewSubDoc.remove();
      restaurant.save(function(err) {
        res.redirect(`/restaurants/${restaurant._id}`)
      })
    })
  }




  function update(req, res) {
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurant) {      // Find the comment subdoc using the id method on Mongoose arrays
      
      const reviewSubDoc = restaurant.reviews.id(req.params.id);      // Ensure that the comment was created by the logged in user
      console.log(reviewSubdoc.user)
      if(!reviewSubDoc.userId.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`);    
      // Update the text of the comment
      reviewSubdoc.content = req.body.text;
      console.log(reviewSubdoc);
      // Save the updated book
      restaurant.save(function(err) {
        // Redirect back to the book's show view
        res.redirect(`/restaurants/${restaurant._id}`);
      });
    });
  }
