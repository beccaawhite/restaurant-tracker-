var router = require('express').Router();
const restaurantsCtrl = require('../controllers/restaurants');


router.get('/restaurants', restaurantsCtrl.index);
router.get('/restaurants/new', restaurantsCtrl.new);
router.post('/restaurants/new', restaurantsCtrl.create);

//show more details on my restaurants 
router.get('/restaurants/:id', restaurantsCtrl.show);
router.post('/restaurants/:id', restaurantsCtrl.add);
router.delete('/restaurants/:id', restaurantsCtrl.delete);



module.exports = router;