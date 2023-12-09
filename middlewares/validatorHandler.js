const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  //(req, res, next)
  //I want to return a middleware function || Closures
  return (req, res, next) => {
    const data = req[property]; //req.body || req.params || req.query
    const { error } = schema.validate(data, { abortEarly: false }); //Abort early to send all errors
    if (error) {
      //Next to go for middlewares type error
      next(boom.badRequest(error));
    }
    //If we don't have error continue the process
    next();
  };
}

module.exports = validatorHandler;
