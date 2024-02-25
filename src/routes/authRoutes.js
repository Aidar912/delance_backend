/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Операции аутентификации
 */

/**
 * @swagger
 * /api/auth/verifySignature:
 *   post:
 *     summary: Проверить подпись
 *     description: Проверяет подпись, используемую для аутентификации. Принимает address,signature,message
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: Адрес, для которого выполняется подпись
 *               signature:
 *                 type: string
 *                 description: Подпись, которую необходимо проверить
 *               message:
 *                 type: string
 *                 description: Сообщение, для которого была создана подпись
 *     responses:
 *       200:
 *         description: Успешная проверка подписи
 *       400:
 *         description: Неправильный формат запроса или недействительная подпись
 *       500:
 *         description: Ошибка сервера
 */



const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/verifySignature', authController.verifySignature);

module.exports = router;
