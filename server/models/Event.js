const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection/config');

class Event extends Model {}

Event.init(
    {
      //TODO columns here
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'event'
    }
)

module.exports = Event;