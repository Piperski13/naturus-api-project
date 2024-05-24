const fs = require('fs');
const express = require('express');

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
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
const getTour = (req, res) => {
  console.log(req.params); // {id: '5'} -> example

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  res.status(200).json({
    status: "sucsess",
    data: {
      tour, // path tours and const tours object , could write only tours
    },
  });
};

const addTour = (req, res) => {
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
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  res.status(200).json({
    status: "sucsess",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  res.status(204).json({
    status: "sucsess",
    data: null,
  });
};

const router = express.Router(); //created a new router and saved it in tourRouter

router
  .route("/")
  .get(getAllTours)
  .post(addTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;