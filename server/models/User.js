const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection/config');

class User extends Model {
    validPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            // TODO email validation
        },
        password:{
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

module.exports = User;
