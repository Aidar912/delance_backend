/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Операции с отзывами
 * /api/review:
 *   post:
 *     summary: Создать отзыв
 *     description: title,description,rating,user
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       500:
 *         description: Ошибка сервера
 *   get:
 *      summary: Получить все отзывы
 *      tags: [Review]
 *      responses:
 *        200:
 *          description: Успешный ответ
 *        500:
 *          description : Ошибка сервера
 * /api/review/{id}:
 *   get:
 *     summary: Получить отзыв по ID
 *     tags: [Review]
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
 *     summary: Обновить отзыв
 *     tags: [Review]
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
 *     summary: Удалить отзыв
 *     tags: [Review]
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
const reviewController= require('../controllers/reviewController');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
