const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Order = require('./orderModel');

const File = sequelize.define('File', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
});

// Связь
File.belongsTo(Order);
Order.hasMany(File);

module.exports = File;
