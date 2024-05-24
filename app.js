const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

//MIDDLEWARE
app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the custom middleware!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//ROUTE HANDLERS
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

//ROUTES

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", addTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(addTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app
  .route("/api/v1/users")
  .get(getAllUsers)
  .post(addUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on the port:${port} for a request...`);
});
