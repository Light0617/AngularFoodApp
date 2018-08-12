const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const usersRouter = require('./server/routes/users');
const dishRouter = require('./server/routes/dishRouter');
const promoRouter = require('./server/routes/promoRouter');
const leaderRouter = require('./server/routes/leaderRouter');
const feedbackRouter = require('./server/routes/feedbackRouter');

const mongoose = require('mongoose');

var passport = require('passport');
var authenticate = require('./server/authenticate');


const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

const app = express();


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
//app.use('/users', usersRouter);

function auth (req, res, next) {
    console.log(req.user);
    if (!req.user) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
    else {
          next();
    }
}

app.use(auth);

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
