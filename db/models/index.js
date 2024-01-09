//Allow to send connections to the models
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

//He read the UserSchema to understand how to create the table
function setupModels(sequelize) {
  //Here we paste all models
  //Init create a namespace named 'models' to access to it. Name is in user.model --> config --> user
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  //Here we execute the associations between models for relational databases
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
