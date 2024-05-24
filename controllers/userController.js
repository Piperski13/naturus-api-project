const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllUsers = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
exports.addUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
exports.getUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
exports.updateUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};
exports.deleteUser = (req,res)=>{
  res.send(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};