var router = require('express').Router();
const restaurantsCtrl = require('../controllers/restaurants');


router.get('/restaurants', isLoggedIn, restaurantsCtrl.index);

router.get('/restaurants/new', isLoggedIn, restaurantsCtrl.new);
router.post('/restaurants/new', isLoggedIn, restaurantsCtrl.create);

//show more details on my restaurants 
router.get('/restaurants/:id', isLoggedIn, restaurantsCtrl.show);
router.post('/restaurants/:id', isLoggedIn, restaurantsCtrl.add);
// router.delete('/restaurants/:id', restaurantsCtrl.delete);

router.get('/restaurants/favorites', isLoggedIn, restaurantsCtrl.index);



function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;