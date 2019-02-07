module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    category: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'No description'
    },
    joy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Item;
};