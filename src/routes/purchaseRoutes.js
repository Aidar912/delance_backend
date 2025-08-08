/**
 * @swagger
 * tags:
 *   name: Purchase
 *   description: Операции с предложениями(работает)
 * /api/purchase:
 *   post:
 *     summary: Создать покупку
 *     tags: [Purchase]
 *     description: purchaseDate,status,totalPrice,buyers
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       500:
 *         description: Ошибка сервера
 *   get:
 *      summary: Получить все покупки
 *      tags: [Purchase]
 *      responses:
 *        200:
 *          description: Успешный ответ
 *        500:
 *          description : Ошибка сервера
 * /api/purchase/{id}:
 *   get:
 *     summary: Получить покупку по ID
 *     tags: [Purchase]
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
 *     summary: Обновить покупку
 *     tags: [Purchase]
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
 *     summary: Удалить покупку
 *     tags: [Purchase]
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




const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Маршруты для покупок
router.post('/', purchaseController.createPurchase);
router.get('/', purchaseController.getAllPurchases);
router.get('/:id', purchaseController.getPurchaseById);
router.put('/:id', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.deletePurchase);

module.exports = router;
