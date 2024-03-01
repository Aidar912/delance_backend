const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('User', {
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    profilePhotoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true

    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    lastOnline: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
}, {
});

module.exports = User;
