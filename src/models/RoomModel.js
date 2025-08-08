// models/Room.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel');


const Room = sequelize.define('Room', {
    // Идентификатор комнаты (автоматически создается)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Идентификатор пользователя 1
    userId1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Идентификатор пользователя 2
    userId2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Дополнительные свойства комнаты можно добавить здесь
}, {
    // Дополнительные настройки модели
});

// Определение связей
Room.belongsTo(User, { foreignKey: 'userId1', as: 'user1' });
Room.belongsTo(User, { foreignKey: 'userId2', as: 'user2' });

module.exports = Room;