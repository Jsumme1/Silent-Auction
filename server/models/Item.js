const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection/config');

class Item extends Model {}

Item.init(
    {
        //TODO columns here
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'item'
    }
)

module.exports = Item;