const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel');
const Room = require('./RoomModel'); // Импортируем модель Room

const Message = sequelize.define('Message', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

// Связи
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' }); // Отправитель сообщения
Message.belongsTo(Room, { foreignKey: 'roomId', as: 'room' }); // Комната, к которой относится сообщение

module.exports = Message;
