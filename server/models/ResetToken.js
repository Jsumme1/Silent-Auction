const { Model, DataTypes } = require('sequelize');
//uses object deconstruction to pull the Model class and DataTypes from the sequlize package

//pull in the database connection 
const sequelize = require('../config/connection/config');

//creates a class Event that extends the sequelize Model class
class ResetToken extends Model { }

//uses the parent Model function init to intialize/define this models columns and other specifications
ResetToken.init(
    {
        //
        email: {
            type: DataTypes.STRING(250),
        },
        expiration: {
            type: DataTypes.DATE,
        },
        token: {
            type: DataTypes.STRING(250),
        },
        used: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            default: 0
        },
    },
    {
        //sets up different sequelize options we have 
        //such as timestamps (created_at, updated_at) and hooks
        sequelize,
        modelName: 'resetToken'
    }
);
//exports sequelize model so that we can access it in the index.js of this folder
module.exports = ResetToken;
