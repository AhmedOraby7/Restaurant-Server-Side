const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

const Leader = require('../models/leaders');
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
    .get(cors.cors, (req, res, next) => {
       Leader.find({})
           .then((leaders) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'text/html');
               res.json(leaders);
           },(err) => next(err))
           .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.create(req.body)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.json(leader);
            },(err) => next(err))
            .catch((err) => next(err))
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT Operation not supported on leaders');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.remove()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.json(resp);
            },(err) => next(err))
            .catch((err) => next(err))
    });


leaderRouter.route('/:leaderId')
    .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
    .get(cors.cors, (req, res, next) => {
        Leader.findById(req.param.leaderId)
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.json(leaders);
            },(err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST Operation not supported on promotion ' + req.params.leaderId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.findByIdAndUpdate(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.json(leader);
            },(err) => next(err))
            .catch((err) => next(err))
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.json(resp);
            },(err) => next(err))
            .catch((err) => next(err))
    });


module.exports = leaderRouter;