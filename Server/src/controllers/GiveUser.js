const { QueryTypes, Model, where } = require("sequelize");
const {
  User,
  sequelize,
  Favorite,
  Character,
  User_Card,
  Card,
} = require("../DB_connection");
const Cards = require("../models/Cards");

const GiveUser = async (user) => {
  let userData = await User.findOne({
    where: {
      email: user.email,
      password: user.password,
    },
  });

  /*     await Card.create({
    id: 444,
    name: "Pink Polo Shirt Jerry",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: "unknown",
    location: "Jerryboree",
    image: "https://rickandmortyapi.com/api/character/avatar/444.jpeg",
  }); */

  const favorites = await User.findAll({
    where: { id: userData.dataValues.id },
    include: { model: Favorite },
  });
  let newFavorites = [];

  favorites[0].Favorites.forEach((el) => {
    newFavorites.push({
      id: el.id,
      name: el.name,
      status: el.status,
      species: el.species,
      type: el.type,
      gender: el.gender,
      origin: el.origin,
      location: el.location,
      image: el.image,
    });
  });

  await User_Card.create({
    CardId: 444,
    UserId: userData.dataValues.id,
  });
  const Cards = await User_Card.findAll();

  return Cards;

  /*   let datos = favorites.favorites.map((el) => {
    delete el.Favorites.User_Favorite;
    return el;
  }); */

  /*   let newUser = {
    id: userData.dataValues.id,
    email: user.email,
    password: user.password,
    cards: [...cards],
    historyId: userData.dataValues.historyId,
    favCards: {
      fav: [...favorites],
      filterFav: [],
    },
    details: {
      user_name: userData.dataValues.user_name,
      about_me: userData.dataValues.about_me,
      user_image: "",
    },
  }; */
};

module.exports = {
  GiveUser,
};
