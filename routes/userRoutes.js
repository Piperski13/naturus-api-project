const fs = require('fs');
const express = require('express');

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllUsers = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
const addUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
const getUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
const updateUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
const deleteUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const router = express.Router(); //created a new router and saved it in userRouter

router
  .route("/")
  .get(getAllUsers)
  .post(addUser);

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;