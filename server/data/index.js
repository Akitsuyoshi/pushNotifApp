const mongoose = require('mongoose');
require('dotenv').config();

//Set up default mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.Promise = require('bluebird');
mongoose.connect(mongoDB, {useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
