const express = require('express');

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  // checkID,
  // checkBody,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
