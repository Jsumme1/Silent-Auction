const { Model, DataTypes } = require('sequelize');
//uses object deconstruction to pull the Model class and DataTypes from the sequlize package

//pull in the database connection 
const sequelize = require('../config/connection/config');

//creates a class Event that extends the sequelize Model class
class Event extends Model {}

//uses the parent Model function init to intialize/define this models columns and other specifications
Event.init(
    {
      //TODO columns here
    },
    {
      //sets up different sequelize options we have 
      //such as timestamps (created_at, updated_at) and hooks
        sequelize,
        freezeTableName: true,
        modelName: 'event'
    }
)

//exports sequelize model so that we can access it in the index.js of this folder
module.exports = Event;