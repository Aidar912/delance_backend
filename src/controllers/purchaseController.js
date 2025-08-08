// controllers/purchaseController.js
const Purchase = require('../models/ServicePurchaseModel');

// Создание новой покупки
function createPurchase(req, res) {
    Purchase.create(req.body)
        .then(purchase => res.status(201).json(purchase))
        .catch(error => res.status(400).json({ message: error.message }));
}

// Получение списка всех покупок
function getAllPurchases(req, res) {
    Purchase.findAll()
        .then(purchases => res.status(200).json(purchases))
        .catch(error => res.status(500).json({ message: error.message }));
}

// Получение одной покупки по ID
function getPurchaseById(req, res) {
    Purchase.findByPk(req.params.id)
        .then(purchase => {
            if (purchase) {
                res.status(200).json(purchase);
            } else {
                res.status(404).json({ message: 'Purchase not found' });
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
}

// Обновление покупки
function updatePurchase(req, res) {
    Purchase.findByPk(req.params.id)
        .then(purchase => {
            if (purchase) {
                purchase.update(req.body)
                    .then(updatedPurchase => res.status(200).json(updatedPurchase))
                    .catch(error => res.status(400).json({ message: error.message }));
            } else {
                res.status(404).json({ message: 'Purchase not found' });
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
}

// Удаление покупки
function deletePurchase(req, res) {
    Purchase.findByPk(req.params.id)
        .then(purchase => {
            if (purchase) {
                purchase.destroy()
                    .then(() => res.status(200).json({ message: 'Purchase deleted' }))
                    .catch(error => res.status(400).json({ message: error.message }));
            } else {
                res.status(404).json({ message: 'Purchase not found' });
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
}

module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
};
