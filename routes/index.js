const notesRouter = require('./notesRouter');

function routerApi(app) {
  //Catch all notes with the routes for this endpoint
  app.use('/notes', notesRouter);
}

module.exports = routerApi;
