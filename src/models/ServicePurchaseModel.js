// purchaseModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Убедитесь, что путь к вашему экземпляру Sequelize правильный
const User = require('./userModel'); // Подключение модели пользователя
const Service = require('./serviceModel'); // Подключение модели услуги

const Purchase = sequelize.define('Purchase', {
    purchaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Дата, когда была совершена покупка'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: {
                args: [['pending', 'paid', 'completed', 'cancelled']],
                msg: "Must be 'pending', 'paid', 'completed', or 'cancelled'"
            }
        },
        comment: 'Текущий статус покупки'
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
        },
        comment: 'Общая цена приобретенной услуги'
    }
}, {
});

User.belongsToMany(Service, { through: Purchase, foreignKey: 'userId', as: 'purchasedServices' });
Service.belongsToMany(User, { through: Purchase, foreignKey: 'serviceId', as: 'buyers' });

module.exports = Purchase;
