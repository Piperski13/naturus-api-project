const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json()); //middleware

// app.get('/',(req,res)=>{
//   res.status(200).json({message: 'Hello from the server',app:'Natours'});
// });

// app.post('/',(req,res)=>{
//   res.send('You can post to this endpoint...')
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: 'sucsess',
    results: tours.length,
    data: {
      tours: tours  // path tours and const tours object , could write only tours
    }
  })
});

app.post("/api/v1/tours",(req,res)=>{
  console.log(req.body);
  res.send('Done');
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on the port:${port} for a request...`);
});
