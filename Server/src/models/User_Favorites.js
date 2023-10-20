const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
  sequelize.define("User_Favorite", {
    FavoriteId: { type: DataTypes.INTEGER, allowNull: false },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  });
};
