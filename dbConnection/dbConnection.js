const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/Mart';

const dbConnection = async () => {
  try {
    console.log('connecting to db');
    await mongoose.connect(dbURI);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
