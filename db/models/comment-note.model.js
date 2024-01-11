const { Model, DataTypes, Sequelize } = require('sequelize');
const { COMMENT_TABLE } = require('./comment.model');
const { NOTE_TABLE } = require('./note.model');

const COMMENT_NOTE_TABLE = 'comments_has_notes';

const CommentNoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  commentId: {
    field: 'comment_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMMENT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  noteId: {
    field: 'note_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NOTE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class CommentNote extends Model {
  static associate() {
    //Here we add the relations with users
    //as is the alias for the association
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_NOTE_TABLE,
      modelName: 'CommentNote',
      timestamps: false,
    };
  }
}

module.exports = { COMMENT_NOTE_TABLE, CommentNoteSchema, CommentNote };
