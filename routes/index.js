const express = require('express');
const notesRouter = require('./notesRouter');

function routerApi(app) {
  const router = express.Router();
  //Create a global path for all endpoints
  app.use('/api/v1', router);
  //Catch all notes with the routes for this endpoint (/api/v1/notes)
  router.use('/notes', notesRouter);
}

module.exports = routerApi;
