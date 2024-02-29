/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Операции с заказами(Не работает)
 * /api/orders:
 *   post:
 *     summary: Создать заказ
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       500:
 *         description: Ошибка сервера
 *   get:
 *      summary: Получить все заказы
 *      tags: [Orders]
 *      responses:
 *        200:
 *          description: Успешный ответ
 *        500:
 *          description : Ошибка сервера
 * /api/orders/{id}:
 *   get:
 *     summary: Получить заказ по ID
 *     tags: [Orders]
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
 *     summary: Обновить заказ
 *     tags: [Orders]
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
 *         description: Заказ не найден
 *       500:
 *         description: Ошибка сервера
 *   delete:
 *     summary: Удалить заказ
 *     tags: [Orders]
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
 *         description: Заказ не найден
 *       500:
 *         description: Ошибка сервера

 */


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
