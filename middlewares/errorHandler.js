const { ValidationError } = require('sequelize');

//Always add next to identify as middleware error
function logErrors(err, req, res, next) {
  console.log('Log Errors');
  console.error(err);
  //When we send error in next we said it is a middleware type error
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('Error Handler');
  //We want to stop and send the response,  not continue the errors
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

//Add Error handler dinamic with boom
function boomErrorHandler(err, req, res, next) {
  //Errors boom have the property isBoom
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  //Validation error is to check if the error comes from sequelize
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
