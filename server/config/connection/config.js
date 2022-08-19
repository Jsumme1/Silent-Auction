const Sequelize = require('sequelize');
//requires sequelize

//allows us to use environment variables
require('dotenv').config();
//short hand if statement
const sequelize = process.env.JAWSDB_URL
//if there is an environmet variable known as JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) //then intialize sequelize with that environment variable
  //otherwise intiate sequelize on localhost using these envrionment variables 
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

//exports the sequelize instance so other files can access it
module.exports = sequelize;
