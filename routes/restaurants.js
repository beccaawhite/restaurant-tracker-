var router = require('express').Router();
const restaurantsCtrl = require('../controllers/restaurants');

// view all restaurants
router.get('/restaurants', isLoggedIn, restaurantsCtrl.index);

// view restaurants specific user created
router.get('/restaurants/mine', isLoggedIn, restaurantsCtrl.myindex);


// view form to create new restaurant
router.get('/restaurants/new', isLoggedIn, restaurantsCtrl.new);

// add the new restaurant 
router.post('/restaurants/new', isLoggedIn, restaurantsCtrl.create);

// adds reviews to specific restaurant
router.post('/restaurants/:id', isLoggedIn, restaurantsCtrl.add);

// show specific restaurant details 
router.get('/restaurants/:id', isLoggedIn, restaurantsCtrl.show);

// delete restaurant entry
router.delete('/restaurants/:id', isLoggedIn, restaurantsCtrl.delete);

// view form to edit specific restaurant
router.get('/restaurants/edit', isLoggedIn, restaurantsCtrl.edit)

// update specific restaurant entry
router.put('/restaurants/:id/mine', isLoggedIn, restaurantsCtrl.update);

// 
router.get('/restaurants/favorites', isLoggedIn, restaurantsCtrl.favorite);



function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;