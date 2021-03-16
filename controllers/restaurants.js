const { populate } = require('../models/restaurant');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');

module.exports = {
    index,
    new: newRestaurant,
    show,
    create, 
    add,
    delete: deleteReview
};


// list of all restaurants
function index(req, res){
    Restaurant.find({}, function(err, restDocuments) {
        console.log(restDocuments)
        res.render("restaurants/index", {
            restaurants: restDocuments
        });
    });
}

// shows details page
function show(req, res){
    console.log("SHOW FUNCTION FIRED")
    Restaurant.findById(req.params.id, function(err, restaurant){

        User.find({restaurant: restaurant._id}, function(err, reviews) {
            // console.log(reviews, "array of reviews")
            console.log(restaurant)
            res.render("restaurants/show", {title: 'restaurant info', restaurant, reviews })
        })
    })
}

// shows new restaurant page
function newRestaurant(req, res){
    res.render("restaurants/new", {title: "Add New Restaurant"})
}

// adds new restaurant to my restaurants and redirects to all page
function create(req, res){
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
      const restaurants = new Restaurant(req.body);
      restaurants.save(function(err) {
        if (err) return res.redirect('/restaurants/new');
        // console.log(restaurants);
        res.redirect("/restaurants");
      });

}

function add(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        restaurant.reviews.push(req.body);
        // console.log(req.body, " THIS IS REQ.BODY")
        restaurant.save(function(err){
            res.redirect(`/restaurants/${restaurant._id}`)
        })
    })

}

function deleteReview(req, res){
    console.log("Bye byeeee")
    // Restaurant.reviews.deleteOne(req.params.id)

    Restaurant.findById(req.params.id, function(err, restaurant){
        Restaurant.findOne({"reviews._id": req.params.id}, function(err, restaurant){
            const reviewDoc = restaurant.reviews.id(req.params.id);
            if(!reviewDoc.userId.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`);
            reviewDoc.remove();
            restaurant.save(function(err){
                res.redirect(`/restaurants/${restaurant._id}`)
            })
        })
    })
}





// console.log(restaurant.reviews, "THIS ITTTTT")
// // restaurant.reviews
// console.log(reviews, "REVIEWS LEFT")
// restaurant.save(function(err){
//     console.log(restaurant)
//     // res.redirect(`/restaurants/${restaurant._id}`)
// })
// // restaurant.reviews.deleteOne(req.body);
// // res.redirect(`/restaurants/${restaurant._id}`)
// })

