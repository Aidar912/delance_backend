const Purchase = require('../models/ServicePurchaseModel');
const User = require('../models/userModel');
const Service = require('../models/serviceModel');

// API для создания покупки
exports.createPurchase = async (req, res) => {
    try {
        const { userId, serviceId, status, totalPrice, quantity, transactionId } = req.body;

        const newPurchase = await Purchase.create({
            userId,
            serviceId,
            status,
            totalPrice,
            quantity,
            transactionId,
            purchaseDate: new Date() // Автоматически устанавливаем текущую дату
        });

        res.status(201).json(newPurchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
