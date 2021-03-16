const router = require('express').Router();
const reviewsCtrl = require('../controllers/reviews');
const restaurantsCtrl = require('../controllers/restaurants');

router.post("/", reviewsCtrl.create);
router.delete('/restaurants/:id', reviewsCtrl.delete);

module.exports = router;



