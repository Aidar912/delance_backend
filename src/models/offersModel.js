const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Подключение к вашей базе данных
const User = require('./userModel');
const File = require("./fileModel");
const Order = require("./orderModel");

const Offer = sequelize.define('Offer', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
});

User.hasMany(Offer, { foreignKey: 'freelanceId' ,as: 'freelanceOffers',});
Offer.belongsTo(User, { foreignKey: 'freelanceId' , as: 'freelance' });
Order.hasMany(Offer, { foreignKey: 'orderId' });
Offer.belongsTo(Order, { foreignKey: 'orderId' });
Offer.hasMany(File, { foreignKey: 'offerId', as: 'files' });
File.belongsTo(Offer, { foreignKey: 'offerId', as: 'offer' });



module.exports = Offer;
