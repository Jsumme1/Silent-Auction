// Import models here
// schemas here and relationships
const User = require('./User')
const Item = require('./Item')
const Event = require('./Event')
const ResetToken = require('./ResetToken')
//requires all the models for the database

//TODO set up relationships for models using Sequelize

//exports the models so that they can be used in the Controllers
module.exports = {User, Item, Event, ResetToken};