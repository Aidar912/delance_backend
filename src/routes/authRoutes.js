const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/verifySignature', authController.verifySignature);

module.exports = router;
