const db      = require("./db");
const User    = require("./user.model");
const Comment = require("./comment.model");
const { Sequelize, DataTypes, Deferrable } = require("sequelize");

const CommentReact = db.define(
  "CommentReacts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Comment,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    index: [
      {
        name: "index_cmtr1",
        fields: ["user_id"],
      },
      {
        name: "index_cmtr2",
        fields: ["comment_id"],
      },
    ],
    timestamps: false,
    underscored: true,
  }
);

CommentReact.sync({ force: false });

module.exports = CommentReact;
