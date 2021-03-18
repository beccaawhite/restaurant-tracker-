const { populate } = require('../models/restaurant');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');

module.exports = {
    index,
    new: newRestaurant,
    show,
    create, 
    add, 
    delete: deleteRestaurant,
    update,
    edit,
    myindex

};


// list of all restaurants
function index(req, res){
    Restaurant.find({}, function(err, restDocuments) {
      
        // console.log(restDocuments)
        res.render("restaurants/index", {
            restaurants: restDocuments
        });
    });
}

// list for restaurants that match userId 
function myindex(req, res, next) {
    Restaurant.find({'userId': req.user._id}, function(err, restaurants) {
      res.render('restaurants/myindex', { 
        title: 'MY restaurants',
        restaurants, 
      });
    });
}

// shows details of each restaurant page
function show(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        
        // .exec(function(err){
            console.log("restaurant reviews", restaurant.reviews)
            res.render("restaurants/show", {title: 'restaurant info', restaurant, user: req.user})
        // })
        // console.log(r.userId)
        // res.render("restaurants/show", {title: 'restaurant info', restaurant})
    })
    
}

// shows new restaurant page
function newRestaurant(req, res){
    res.render("restaurants/new", {title: "Add New Restaurant"})
}

// delete a restaurant
function deleteRestaurant(req, res){
    Restaurant.findByIdAndDelete(req.params.id, function() {
        res.redirect('/restaurants');
    })
}

// adds new restaurant to all restaurants and redirects to all page
function create(req, res){
        
    const restaurant = new Restaurant(req.body);
    restaurant.user = req.user._id;
      restaurant.userId = req.user._id;
      restaurant.save(function(err) {
        if (err) return res.redirect('/restaurants/new');
        // console.log(restaurants);
        res.redirect("/restaurants");
      });

}

// adds reviews to specific restaurant
function add(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        restaurant.reviews.push(req.body);
        // console.log(req.body, " THIS IS REQ.BODY")
        restaurant.save(function(err){
            res.redirect(`/restaurants/${restaurant._id}`)
        })
    })

}

// this allows user that made restaurant to edit the title
function edit(req, res) {
    console.log("EDIT IS FIRING")
    Restaurant.findById(req.params.id, function(err, restaurant) {
      // Verify restaurant is "owned" by logged in user
      console.log(restaurant.userId, "REST USER ID")
      if (!restaurant.userId.equals(req.user._id)) return res.redirect('/restaurants');
      res.render('restaurants/edit', {restaurant});
        
    
    });
  }


function update(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Restaurant.findById(req.params.id, function(err, restaurant) {
      if (!restaurant.userId.equals(req.user._id)) return res.redirect("/restaurants");
      restaurant.name = req.body.name
    //   restaurant.userId = req.user._id;
      restaurant.save(function(err) {
        res.redirect(`/restaurants/${restaurant._id}`);
      });
    });
  }


