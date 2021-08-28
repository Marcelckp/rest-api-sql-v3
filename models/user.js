'use strict';

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class User extends Model {};
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "The format you gave for firstName is incorrect fix it and send your request again"
                },
                notNull: {
                    msg: "The value for cannot firstName be null"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "The format you gave for lastName is incorrect fix it and send your request again"
                },
                notNull: {
                    msg: "The value for lastName cannot be null"
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "The format you gave for emailAddress is incorrect fix it and send your request again"
                },
                notNull: {
                    msg: "The value for emailAddress cannot be null"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "The format you gave for password is incorrect fix it and send your request again"
                },
                notNull: {
                    msg: "The value for password cannot be null"
                }
            }
        }
    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'user',
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            }
        })
    }

    return User;
}