const orderRoutes = require('./orderRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
    app.use('/api/orders', orderRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
};
