const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel');
const Category = require('./CategoryModel');
const File = require('./fileModel');

const Service = sequelize.define('Service', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    minprice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maxprice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'close', 'paused'),
        defaultValue: 'active',
        allowNull: false
    }
}, {
});

Service.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
User.hasMany(Service, { foreignKey: 'sellerId', as: 'services' });
Service.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Service, { foreignKey: 'categoryId', as: 'services' });
Service.hasMany(File, { foreignKey: 'serviceId', as: 'files' });
File.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

module.exports = Service;