const { Model, DataTypes, Sequelize } = require('sequelize');

const NOTE_TABLE = 'notes';

const NoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  isBlock: {
    field: 'is_block',
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
};

class Note extends Model {
  static associate() {
    //Here we add the relations with users
    //as is the alias for the association
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTE_TABLE,
      modelName: 'Note',
      timestamps: false,
    };
  }
}

module.exports = { NOTE_TABLE, NoteSchema, Note };
