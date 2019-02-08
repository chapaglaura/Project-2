module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
        isAlphanumeric: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
          isNumeric: true
      }
    }
  });
  return User;
};