/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Операции с категориями
 * /api/category:
 *   post:
 *     summary: Создать категорию
 *     tags: [Category]
 *     description: name,description
 *     responses:
 *       200:
 *         description: Успешное создание категории
 *
 *       400:
 *         description: Ошибка валидации или переданы некорректные данные
 *       500:
 *         description: Ошибка сервера
 *
 *   get:
 *      summary: Получить все категории
 *      tags: [Category]
 *      responses:
 *        200:
 *          description: Успешный ответ
 *        500:
 *          description : Ошибка сервера
 * /api/category/{id}:
 *   get:
 *     summary: Получить категорию по ID
 *     tags: [Category]
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
 *         description: категориюя не найдена
 *       500:
 *         description: Ошибка сервера
 *   put:
 *     summary: Обновить категорию
 *     tags: [Category]
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
 *     summary: Удалить категорию
 *     tags: [Category]
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
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
