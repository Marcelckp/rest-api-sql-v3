'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model {};
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "The value for description cannot be null"
                },
                notEmpty: {
                    msg: "The format you gave for title is incorrect fix it and send your request again"

                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "The value for description cannot be null"
                },
                notEmpty: {
                    msg: "The format you gave for description is incorrect fix it and send your request again"

                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
        }
    }, { sequelize });
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: 'user',
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            }
        })
    }

    return Course;
}