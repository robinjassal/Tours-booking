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
const { protect, restrictTo } = require('../controllers/authController');
const { createReview } = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/:tourId/reviews')
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
