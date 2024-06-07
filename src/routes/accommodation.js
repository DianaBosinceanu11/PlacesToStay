const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');



// Define the route for creating a new accommodation
router.post('/', accommodationController.createAccommodation);

// Define the route for getting the  accommodations by type and/or location
router.get('/', accommodationController.getAllAccommodations);

router.get('/:location', accommodationController.getAccommodationsByLocation);

router.get('/:type/:location', accommodationController.getAccommodationsByTypeAndLocation);




module.exports = router;
