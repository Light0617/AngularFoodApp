const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Feedbacks = require('../models/feedbacks');
const authenticate = require('../authenticate');

const feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());


feedbackRouter.route('/')
.get((req,res,next) => {
    Feedbacks.find({})
    .then((feedbacks) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedbacks);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Feedbacks.create(req.body)
    .then((feedback) => {
        console.log('Feedback Created ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /feedbacks');
})
.delete(authenticate.verifyAdmin, (req, res, next) => {
    Feedbacks.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports =  feedbackRouter;
