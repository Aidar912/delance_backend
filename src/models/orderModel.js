const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel');
const Category = require("./CategoryModel");
const File = require("./fileModel");

const Order = sequelize.define('Order', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('open', 'closed', 'pending'),
        allowNull: false,
        defaultValue: 'open'
    }

}, {
});

// Связи
Order.belongsTo(User, {as: 'client', foreignKey: 'clientId'});
Order.belongsTo(User, {as: 'executor', foreignKey: 'executorId'});
User.hasMany(Order, {as: 'clientOrders', foreignKey: 'clientId'});
User.hasMany(Order, {as: 'executorOrders', foreignKey: 'executorId'});
Order.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Order, { foreignKey: 'categoryId', as: 'order' });
Order.hasMany(File, { foreignKey: 'orderId', as: 'files' });
File.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

module.exports = Order;
