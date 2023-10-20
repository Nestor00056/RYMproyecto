const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      historyId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      about_me: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      credentials_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
};
