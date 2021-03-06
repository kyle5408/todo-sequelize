'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.associate = function (models) {
        Todo.belongsTo(models.User)
      }
      // define association here
    }
  };
  Todo.init({
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    userId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};