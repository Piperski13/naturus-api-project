const Tour = require('./../models/tourModel')

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

exports.addTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: "sucsess",
      data: {
        tour: newTour,
      },
  });
  } catch (error) {
    res.status(400).json({
      status: 'failed request',
      message: error
    })
  }
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