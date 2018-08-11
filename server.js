const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./server/routes/api');
const usersRouter = require('./server/routes/users');
const dishRouter = require('./server/routes/dishRouter');
const promoRouter = require('./server/routes/promoRouter');
const leaderRouter = require('./server/routes/leaderRouter');
const feedbackRouter = require('./server/routes/feedbackRouter');

const app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.use('/feedbacks',feedbackRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


// const express = require('express');
// const path = require('path');
// const http = require('http');
// const bodyParser = require('body-parser');
//
// // Get our API routes
// const api = require('./server/routes/api');
//
// const app = express();
//
// // Parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//
// // Point static path to dist
// app.use(express.static(path.join(__dirname, 'public')));
//
// // Set our api routes
// app.use('/api', api);
//
// // Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });
//
// /**
//  * Get port from environment and store in Express.
//  */
// const port = process.env.PORT || '3000';
// app.set('port', port);
//
// /**
//  * Create HTTP server.
//  */
// const server = http.createServer(app);
//
// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port, () => console.log(`API running on localhost:${port}`));
