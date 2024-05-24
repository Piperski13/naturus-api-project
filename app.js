const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes")

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

//ROUTES
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on the port:${port} for a request...`);
});
