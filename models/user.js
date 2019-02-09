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
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 15]
      }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};