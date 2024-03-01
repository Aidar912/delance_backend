const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offersController');
const upload = require('../config/multer');

// Routes
router.post('/', upload.array('files'), offerController.createOffer);
router.put('/:id', upload.array('files'), offerController.updateOffer);
router.get('/', offerController.getAllOffers);
router.get('/:id', offerController.getOffersById);
router.delete('/:id', offerController.deleteOffers);
router.get('/orders/:orderId/', offerController.listOffersForOrder);
module.exports = router;
