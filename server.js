const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');

// import environmental variables from our variables.env file
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: 'variables.env' });
}

//console.log("DB", process.env.DATABASE);


// **** Uncomment this code if user data should be
// saved to MongoDB at some point in the future
// Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);
// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// mongoose.connection.on('error', (err) => {
//   console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });
// mongoose.connection.once('open', function() {
//     console.log("Successfully connected to the database");
// })

//Import all of the models - you only have to do this once
//require('./models/User');

//create an express app
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requet of content-type - application/json
app.use(bodyParser.json());

app.use('/', routes)

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {  
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// listen for requests
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});