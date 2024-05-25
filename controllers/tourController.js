const Tour = require('./../models/tourModel')

//param middleware
exports.checkBody = (req,res,next)=>{
 if(!req.body.name || !req.body.price ){
  return res.status(400).json({
    status: 'fail',
    message: 'Missing name or price'
  })
 };
 next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "sucsess",
    // results: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours: tours, // path tours and const tours object , could write only tours
    // },
  });
};
exports.getTour = (req, res) => {
  console.log(req.params); // {id: '5'} -> example

  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "sucsess",
  //   data: {
  //     tour, // path tours and const tours object , could write only tours
  //   },
  // });
};

exports.addTour = (req, res) => {
  res.status(201).json({
    status: "sucsess",
    // data: {
    //   tour: newTour,
    // },
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "sucsess",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "sucsess",
    data: null,
  });
};