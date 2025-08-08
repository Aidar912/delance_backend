/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Операции с предложениями(работает)
 * /api/offers:
 *   post:
 *     summary: Создать предложение
 *     tags: [Offers]
 *     description: description,price,freelance,orderId,files
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       500:
 *         description: Ошибка сервера
 *   get:
 *      summary: Получить все предложения
 *      tags: [Offers]
 *      responses:
 *        200:
 *          description: Успешный ответ
 *        500:
 *          description : Ошибка сервера
 * /api/offers/{id}:
 *   get:
 *     summary: Получить предложение по ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       404:
 *         description: Заказ не найден
 *       500:
 *         description: Ошибка сервера
 *   put:
 *     summary: Обновить предложение
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       400:
 *         description: Неверный запрос
 *       404:
 *         description: Предложение не найдено
 *       500:
 *         description: Ошибка сервера
 *   delete:
 *     summary: Удалить предложение
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       400:
 *         description: Неверный запрос
 *       404:
 *         description: Предложение не найдено
 *       500:
 *         description: Ошибка сервера

 */

/**
 * @swagger
 * /api/offers/orders/{id}/:
 *   get:
 *     summary: Получить все предложения для заказа
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       404:
 *         description: Заказ не найден
 *       500:
 *         description: Ошибка сервера
 */







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
