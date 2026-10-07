const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//import Data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully Loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Deleted all data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully Deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
console.log(process.argv);
