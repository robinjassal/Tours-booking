const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`tour id is: ${val} `); //tour id is: 9
  next();
});

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
