const router = require('express').Router();
const reviewsCtrl = require('../controllers/reviews');
const restaurantsCtrl = require('../controllers/restaurants');

router.post("/", isLoggedIn, reviewsCtrl.create);

router.delete('/restaurants/:id', isLoggedIn, reviewsCtrl.delete);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;



