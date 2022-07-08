const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection/config');

class ResetToken extends Model {}

ResetToken.init({
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
    sequelize,
    modelName: 'resetToken'
    }
);

module.exports=ResetToken;
