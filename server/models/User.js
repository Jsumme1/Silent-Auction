const { Model, DataTypes } = require('sequelize');
//uses object deconstruction to pull the Model class and DataTypes from the sequlize package

//pull in the database connection 
const sequelize = require('../config/connection/config');
//requires bcrypt package to allow us to hash and hide a users password for security
const bcrypt = require('bcrypt')

//creates a class Event that extends the sequelize Model class
class User extends Model {
    //
    validPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//uses the parent Model function init to intialize/define this models columns and other specifications
User.init(
    {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            // TODO email validation
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // TODO password length? validataion
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        //sets up different sequelize options we have 
        //such as timestamps (created_at, updated_at) and hooks
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        freezeTableName: true,
        modelName: 'user'
    }
)
//exports sequelize model so that we can access it in the index.js of this folder
module.exports = User;
