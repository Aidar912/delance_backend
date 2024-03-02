const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('delance', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});
module.exports = sequelize;
