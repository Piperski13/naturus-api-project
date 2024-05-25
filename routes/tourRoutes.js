const express = require('express');
const tourController = require('./../controllers/tourController');
// const {getAllTours,addTour,getTour,deleteTour} = require('./../controllers/tourController');

const router = express.Router(); //created a new router and saved it in tourRouter

// router.param('id',tourController.checkId);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.addTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;