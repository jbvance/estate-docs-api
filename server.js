const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
console.log("DB", process.env.DATABASE);

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

//create an express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requet of content-type - application/json
app.use(bodyParser.json());

//define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the API!"});
});

// listen for requests
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});