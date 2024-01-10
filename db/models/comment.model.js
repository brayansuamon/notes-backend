const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const COMMENT_TABLE = 'comments';

const CommentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class Comment extends Model {
  static associate(models) {
    //Here we add the relations with users
    //as is the alias for the association
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    //The comment can have many notes
    this.belongsToMany(models.Note, {
      as: 'items',
      //With the table of comment note to do the relation
      through: models.CommentNote,
      //Key of the table which I am solving the relation
      foreignKey: 'commentId',
      otherKey: 'noteId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: false,
    };
  }
}

module.exports = { COMMENT_TABLE, CommentSchema, Comment };
