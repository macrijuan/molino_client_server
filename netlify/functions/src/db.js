const { Sequelize } = require('sequelize');
require("dotenv").config();
const dbConfig = require("./dbConfig.js");

let sequelize = new Sequelize( `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, dbConfig );

const modelDefiners = [
  require("./models/Diet.js"),
  require("./models/Drink.js"),
  require("./models/Dish.js"),
  require("./models/Reservation.js"),
  require("./models/Table.js"),
  require("./models/User.js")
];

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => {
  return [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
});
sequelize.models = Object.fromEntries(capsEntries);


const { Diet, Drink, Dish, User, Reservation, Table } = sequelize.models;

Reservation.hasOne( User );

User.hasMany( Reservation );
Table.hasMany( Reservation );

Reservation.hasOne( Table, { foreignKey:"ticket reserve", as:"ticket reserve" } );

Diet.belongsToMany( Dish, { through:"dish_diets", timestamps:false } );
Dish.belongsToMany( Diet, { through:"dish_diets", timestamps:false } );

Diet.belongsToMany( Drink, { through:"drink_diets", timestamps:false } );
Drink.belongsToMany( Diet, { through:"drink_diets", timestamps:false } );

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};