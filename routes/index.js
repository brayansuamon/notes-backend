const express = require('express');
const notesRouter = require('./notesRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customersRouter');

function routerApi(app) {
  const router = express.Router();
  //Create a global path for all endpoints
  app.use('/api/v1', router);
  //Catch all notes with the routes for this endpoint (/api/v1/notes)
  router.use('/notes', notesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;
