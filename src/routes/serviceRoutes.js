const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const upload = require('../config/multer');

// Routes
router.post('/', upload.array('files'), orderController.createOrder);
router.put('/:id', upload.array('files'), orderController.updateOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
