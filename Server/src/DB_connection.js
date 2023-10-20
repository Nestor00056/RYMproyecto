require("dotenv").config();
const { Sequelize } = require("sequelize");
const UserModel = require("./models/UserModel");
const CharacterModel = require("./models/CharacterModel");
const Favorites = require("./models/Favorites");
const Cards = require("./models/Cards");
const User_Favorites = require("./models/User_Favorites");
const User_Cards = require("./models/User_Cards");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
  { logging: false }
);

UserModel(sequelize),
  CharacterModel(sequelize),
  Favorites(sequelize),
  User_Favorites(sequelize),
  Cards(sequelize),
  User_Cards(sequelize);

const { User, Character, Favorite, Card, User_Favorite, User_Card } =
  sequelize.models;

Favorite.belongsToMany(User, { through: User_Favorite });
User.belongsToMany(Favorite, { through: User_Favorite });

Card.belongsTo(User, { through: User_Card, foreignKey: "UserId" });
User.belongsTo(Card, { through: User_Card, foreignKey: "CardId" });
module.exports = {
  User,
  Character,
  Favorite,
  User_Favorite,
  Card,
  User_Card,
  sequelize,
};
