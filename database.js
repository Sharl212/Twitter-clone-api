//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = 'mongodb://admin:admin123@ds029635.mlab.com:29635/twitter-api';


mongoose.connect(mongoDB, { useNewUrlParser: true } ,(err, res) => {
    if (err) {
        console.log ('ERROR connecting to: ' + mongoDB + ' => ' + err);
    } else {
        console.log ('Succeeded connected to: ' + mongoDB);
    }
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;