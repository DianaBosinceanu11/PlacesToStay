const express = require('express');
const router = express.Router();
const { addAccDate, updateAccDateAvailability, addAccDateRange, populateAvailability } = require('../controllers/accommodationController');

router.post('/dates', addAccDate);
router.put('/dates', updateAccDateAvailability);
router.post('/dates/range', addAccDateRange);  // handles bulk inserts for further development of the app
// Route to populate availability
router.post('/dates/populate', populateAvailability);

module.exports = router;
