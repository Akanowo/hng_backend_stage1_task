const baseRouter = require('./baseRouter');

const apiRouter = require('express').Router();

apiRouter.use('/', baseRouter);

module.exports = apiRouter;
