const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel');

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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'open'
    }
}, {
});

// Связи
Order.belongsTo(User, {as: 'client', foreignKey: 'clientId'}); // Заказчик
Order.belongsTo(User, {as: 'executor', foreignKey: 'executorId'}); // Исполнитель
User.hasMany(Order, {as: 'clientOrders', foreignKey: 'clientId'});
User.hasMany(Order, {as: 'executorOrders', foreignKey: 'executorId'});

module.exports = Order;
