const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//param middleware
exports.checkId = (req,res,next,val)=>{
  console.log(`middlawre param : ${req.params.id}  , ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  next();
}

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "sucsess",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours: tours, // path tours and const tours object , could write only tours
    },
  });
};
exports.getTour = (req, res) => {
  console.log(req.params); // {id: '5'} -> example

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "sucsess",
    data: {
      tour, // path tours and const tours object , could write only tours
    },
  });
};

exports.addTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "sucsess",
        data: {
          tour: newTour,
        },
      });
    }
  );
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