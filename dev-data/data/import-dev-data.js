const fs = require('fs')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Succesfull DB conection"))
  .catch((err) => console.error("DB connection error:", err));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

//IMPORT DATA INTO DB
const importData = async() =>{
  try {
    await Tour.create(tours);
    console.log('Database sucessfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

//DELETE DATA FROM DB
const deleteData = async() =>{
  try {
    await Tour.deleteMany();
    console.log('Database sucessfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

//CLI command to run the functions 
if(process.argv[2] === '--import'){
  importData();
}
else if (process.argv[2] === '--delete'){
  deleteData();
}

console.log(process.argv);