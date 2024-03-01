const orderRoutes = require('./orderRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const offerRoutes = require('./offersRoutes');
const serviceRoutes = require('./serviceRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const reviewRoutes = require('./reviewRoutes');

module.exports = (app) => {
    app.use('/api/orders', orderRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/offers', offerRoutes);
    app.use('/api/services', serviceRoutes);
    app.use('/api/purchase', purchaseRoutes);
    app.use('/api/review', reviewRoutes);
};
