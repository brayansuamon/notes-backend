//Allow to send connections to the models
const { User, UserSchema } = require('./user.model');

//He read the UserSchema to understand how to create the table
function setupModels(sequelize) {
  //Here we paste all models
  //Init create a namespace named 'models' to access to it. Name is in user.model --> config --> user
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
