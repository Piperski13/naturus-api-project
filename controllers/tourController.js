const Tour = require('./../models/tourModel')

exports.getAllTours = async(req, res) => {
  try {
    const tours = await Tour.find()

    res.status(200).json({
      status: "sucsess",
      results: tours.length,
      data: {
        tours // path tours and const tours object , could write only tours
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed request',
      message: error
    })
  }
};
exports.getTour = async(req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //req.params.id -> router.route("/:id")
    res.status(200).json({
      status: "sucsess",
      data: {
        tour, // path tours and const tours object , could write only tours
      },
    });
  } catch (error) {
    res.status(404).json({
      status:'failed request',
      message: error
    })
  } 
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