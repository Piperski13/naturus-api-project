const Tour = require('./../models/tourModel')

exports.getAllTours = async(req, res) => {
  try {
    //BUILD QUERY

    // 1) Filtering
    const queryObj = { ...req.query };
    const excludeFieds = ['page','sort','limit','fields'];
    excludeFieds.forEach(el => delete queryObj[el]);

    // 1.1) Advanced Filtering (grater then equal, greater then etc. $gte, filter mongoose)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    //{ duration: { '$gte': '5' }, difficulty: 'easy' }

    // 2) SORTING
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }else{
      query = query.sort('-createdAt');
    }

    //EXECUTE QUERY
    const tours = await query;

    //SEND RESPONSE
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
exports.updateTour = async(req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body , {
      new: true, // return a new tour (updated one)
      runValidators: true  //running validators again -> example price {type:Number,required:true}
    })
    res.status(200).json({
      status: "sucsess",
      data: {
        tour
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed request',
      message: error
    });
  };
};
exports.deleteTour = async(req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id)
    res.status(204).json({
      status: "sucsess",
      data: null,
    });
  } catch (error) {
      res.status(400).json({
        status: 'failed request',
        message: error
      });
  }
};