const express = require('express');
const userController = require('./../controllers/userController');
const app = express();

const router = express.Router(); //created a new router and saved it in userRouter

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;